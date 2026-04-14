<?php
/**
 * Validation utilities (aligned with frontend useLotteryForm productCodeSchema).
 * validateProductCode(string $code): ['valid' => bool, 'error' => ?string]
 */

const VALIDATION_ERROR_CODE_LENGTH = 'کد محصول باید ۱۷ رقم باشد.';
const VALIDATION_ERROR_CODE_INVALID = 'کد درج شده صحیح نمی باشد';
const VALIDATION_ERROR_FROM_DATE_INVALID = 'Invalid fromDate format. Use YYYY-MM-DD.';
const VALIDATION_ERROR_TO_DATE_INVALID = 'Invalid toDate format. Use YYYY-MM-DD.';
const VALIDATION_ERROR_DATE_RANGE_INVALID = 'fromDate must be less than or equal to toDate.';

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

/**
 * Validate strict date format (YYYY-MM-DD).
 *
 * @param string $date Date string to validate.
 * @return bool
 */
function validateIsoDate(string $date): bool
{
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
        return false;
    }

    $dt = DateTime::createFromFormat('Y-m-d', $date);
    return $dt !== false && $dt->format('Y-m-d') === $date;
}

/**
 * Validate optional fromDate / toDate query values.
 *
 * @param string $fromDate Empty or YYYY-MM-DD.
 * @param string $toDate Empty or YYYY-MM-DD.
 * @return array{valid: bool, error?: string}
 */
function validateDateRange(string $fromDate, string $toDate): array
{
    if ($fromDate !== '' && !validateIsoDate($fromDate)) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_FROM_DATE_INVALID];
    }

    if ($toDate !== '' && !validateIsoDate($toDate)) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_TO_DATE_INVALID];
    }

    if ($fromDate !== '' && $toDate !== '' && $fromDate > $toDate) {
        return ['valid' => false, 'error' => VALIDATION_ERROR_DATE_RANGE_INVALID];
    }

    return ['valid' => true];
}
