<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

try {
    $services = getServices();
    // Декодируем JSON поля
    foreach ($services as &$service) {
        if (isset($service['features']) && is_string($service['features'])) {
            $service['features'] = json_decode($service['features'], true) ?: [];
        }
    }
    echo json_encode($services);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
?>