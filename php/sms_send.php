<?php
/**
 * SMS Send API – send SMS via Kavenegar.
 * POST JSON: { "receptor": "09...", "message": "..." } or receptor as array.
 * Optional: "sender" (default from env KAVENEGAR_SENDER_LINE)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, *');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

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

$apiKey = getenv('KAVENEGAR_API_KEY');
$sender = getenv('KAVENEGAR_SENDER_LINE');
if (empty($apiKey)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'SMS provider not configured']);
    exit;
}

$raw   = file_get_contents('php://input');
$input = json_decode($raw, true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON body']);
    exit;
}

$receptor = $input['receptor'] ?? null;
$message  = isset($input['message']) ? trim((string) $input['message']) : '';
if (empty($sender)) {
    $sender = null;
}
if (isset($input['sender']) && trim((string) $input['sender']) !== '') {
    $sender = trim((string) $input['sender']);
}

if ($receptor === null || $receptor === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing receptor']);
    exit;
}
if ($message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing message']);
    exit;
}
if (empty($sender)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Sender line not configured']);
    exit;
}

require __DIR__ . '/vendor/autoload.php';

use Kavenegar\KavenegarApi;
use Kavenegar\Exceptions\ApiException;
use Kavenegar\Exceptions\HttpException;

try {
    $api    = new KavenegarApi($apiKey);
    $result = $api->Send($sender, $receptor, $message);
    $list   = is_array($result) ? $result : [$result];
    echo json_encode([
        'success' => true,
        'message' => 'SMS sent',
        'data'    => $list,
    ]);
} catch (ApiException $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->errorMessage()]);
} catch (HttpException $e) {
    http_response_code(502);
    echo json_encode(['success' => false, 'error' => $e->errorMessage()]);
}
