<?php
/**
 * Simple REST API: accepts POST name, phone_number, code and stores in MySQL.
 * Ensures schema `netbina` and table `persil_gratitude` exist before insert.
 */

// CORS: allow all origins
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: *');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Load .env from same directory if present (dev: php/.env; production: set by deploy or server)
$envFile = __DIR__ . '/.env';
if (is_readable($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        if (strpos($line, '=') !== false) {
            [$name, $value] = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value, " \t\"'");
            if ($name !== '') {
                putenv("$name=$value");
            }
        }
    }
}

// DB config from env (dev: php/.env; production: GitHub Actions secrets → php/.env on server)
$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$dbPort = getenv('DB_PORT') ?: '3306';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') ?: '';
$dbName = getenv('DB_NAME') ?: 'netbina';

// Read POST body (supports both form-data and JSON)
$input = $_POST;
if (empty($input) && ($raw = file_get_contents('php://input'))) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

$name        = isset($input['name']) ? trim((string) $input['name']) : '';
$phoneNumber = isset($input['phone_number']) ? trim((string) $input['phone_number']) : '';
$code        = isset($input['code']) ? trim((string) $input['code']) : '';

if ($name === '' || $phoneNumber === '' || $code === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error'   => 'Missing or empty required fields: name, phone_number, code',
    ]);
    exit;
}

if (strlen($code) > 50) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error'   => 'code must be at most 50 characters',
    ]);
    exit;
}

try {
    // Connect without database first (to create schema if needed)
    $pdo = new PDO(
        "mysql:host=$dbHost;port=$dbPort;charset=utf8mb4",
        $dbUser,
        $dbPass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // Ensure schema exists (in MySQL, schema = database)
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName`");
    $pdo->exec("USE `$dbName`");

    // Ensure table exists
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `persil_gratitude` (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone_number VARCHAR(100) NOT NULL,
            code VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $stmt = $pdo->prepare(
        'INSERT INTO `persil_gratitude` (name, phone_number, code) VALUES (:name, :phone_number, :code)'
    );
    $stmt->execute([
        ':name'         => $name,
        ':phone_number' => $phoneNumber,
        ':code'         => $code,
    ]);

    $id = (int) $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Record created',
        'id'      => $id,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Database error',
        'detail'  => $e->getMessage(),
    ]);
}
