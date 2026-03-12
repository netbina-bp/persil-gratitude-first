<?php
/**
 * SMS Receive API – fetch received SMS from Kavenegar (inbox).
 * For each message: validate as product code, send reply SMS to sender (valid/invalid).
 * GET ?is_read=0|1 (optional, default 0 = unread)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Load .env (same as api.php)
$envFile = __DIR__ . '/.env';
if (is_readable($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            [$name, $value] = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value, " \t\"'");
            if ($name !== '') putenv("$name=$value");
        }
    }
}

$apiKey     = getenv('KAVENEGAR_API_KEY');
$lineNumber = getenv('KAVENEGAR_SENDER_LINE');
$isRead     = isset($_GET['is_read']) ? (int) $_GET['is_read'] : 0;

if (empty($apiKey) || empty($lineNumber)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'SMS provider not configured']);
    exit;
}

// DB config (same as api.php) – for inserting valid codes
$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$dbPort = getenv('DB_PORT') ?: '3306';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') ?: '';
$dbName = getenv('DB_NAME') ?: 'netbina';

$pdo = null;
try {
    $pdo = new PDO(
        "mysql:host=$dbHost;port=$dbPort;charset=utf8mb4",
        $dbUser,
        $dbPass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    ); 
    $pdo->exec("USE `$dbName`"); 
} catch (PDOException $e) {
    $pdo = null;
}

require_once __DIR__ . '/validationUtil.php';
require __DIR__ . '/vendor/autoload.php';

use Kavenegar\KavenegarApi;
use Kavenegar\Exceptions\ApiException;
use Kavenegar\Exceptions\HttpException;

$messageValid   = "همراه گرامی پریل و پرسیل\nکد محصول برای شرکت در قرعه‌کشی، با موفقیت دریافت شد. قدردان همراهی‌تان هستیم.";
$messageInvalid = "همراه گرامی پریل و پرسیل\nمتاسفانه کد محصول ارسالی اشتباه است.\nلطفا کد را کنترل کرده و دوباره ارسال کنید.";

try {
    $api    = new KavenegarApi($apiKey);
    $result = $api->Receive($lineNumber, $isRead);
    $list   = is_array($result) ? $result : [];
    $replies = [];

    $insertStmt = $pdo ? $pdo->prepare(
        'INSERT INTO `persil_gratitude` (name, phone_number, code) VALUES (:name, :phone_number, :code)'
    ) : null;

    foreach ($list as $item) {
        $messageText = isset($item->message) ? trim((string) $item->message) : '';
        $senderPhone = isset($item->sender) ? trim((string) $item->sender) : '';
        $messageId   = isset($item->messageid) ? $item->messageid : null;

        if ($senderPhone === '') {
            $replies[] = ['messageid' => $messageId, 'sent' => false, 'reason' => 'missing_sender'];
            continue;
        }

        $validation = validateProductCode($messageText);
        $replyText  = $validation['valid'] ? $messageValid : $messageInvalid;

        $insertedId = null;
        $dbError   = null;
        if ($validation['valid'] && $insertStmt) {
            try {
                $insertStmt->execute([
                    ':name'         => $senderPhone,
                    ':phone_number' => $senderPhone,
                    ':code'         => $messageText,
                ]);
                $insertedId = (int) $pdo->lastInsertId();
            } catch (PDOException $e) {
                $dbError = $e->getMessage();
            }
        }

        try {
            $api->Send($lineNumber, $senderPhone, $replyText);
            $replies[] = [
                'messageid'   => $messageId,
                'sender'      => $senderPhone,
                'code_valid'  => $validation['valid'],
                'sent'        => true,
                'inserted_id' => $insertedId ?: null,
                'db_error'    => $dbError,
            ];
        } catch (\Exception $e) {
            $replies[] = [
                'messageid'   => $messageId,
                'sender'      => $senderPhone,
                'code_valid'  => $validation['valid'],
                'sent'        => false,
                'error'       => $e->getMessage(),
                'inserted_id' => $insertedId ?: null,
                'db_error'    => $dbError,
            ];
        }
    }

    echo json_encode([
        'success' => true,
        'data'    => $list,
        'replies' => $replies,
    ]);
} catch (ApiException $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->errorMessage()]);
} catch (HttpException $e) {
    http_response_code(502);
    echo json_encode(['success' => false, 'error' => $e->errorMessage()]);
}
