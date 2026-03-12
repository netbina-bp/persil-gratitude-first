<?php
/**
 * Validation utilities (aligned with frontend useLotteryForm productCodeSchema).
 * validateProductCode(string $code): ['valid' => bool, 'error' => ?string]
 */

const VALIDATION_ERROR_CODE_LENGTH = 'کد محصول باید ۱۷ رقم باشد.';
const VALIDATION_ERROR_CODE_INVALID = 'کد درج شده صحیح نمی باشد';

/**
 * Validate product code: 17 digits with segment rules.
 * Structure: day(2) + month(2) + fixed(2) + segment(2) + batch(2) + level(1) + tail(6).
 *
 * @param string $code Raw code (will be trimmed).
 * @return array{valid: bool, error?: string}
 */
function validateProductCode(string $code): array
{
    $code = trim($code);

    if (!preg_match('/^\d{17}$/', $code)) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_CODE_LENGTH];
    }

    $day     = (int) substr($code, 0, 2);
    $month   = (int) substr($code, 2, 2);
    $fixed   = substr($code, 4, 2);
    $segment = (int) substr($code, 6, 2);
    $batch   = (int) substr($code, 8, 2);
    $level   = (int) substr($code, 10, 1);
    $tail    = (int) substr($code, 11, 6);

    if ($day < 1 || $day > 31) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_CODE_INVALID];
    }
    if ($month < 1 || $month > 3) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_CODE_INVALID];
    }
    if ($fixed !== '26') {
        return ['valid' => false, 'error' => VALIDATION_ERROR_CODE_INVALID];
    }
    if ($segment < 1 || $segment > 7) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_CODE_INVALID];
    }
    if ($batch < 1 || $batch > 99) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_CODE_INVALID];
    }
    if (!in_array($level, [1, 2, 3], true)) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_CODE_INVALID];
    }
    if ($tail < 10000 || $tail > 900000) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_CODE_INVALID];
    }

    return ['valid' => true];
}
