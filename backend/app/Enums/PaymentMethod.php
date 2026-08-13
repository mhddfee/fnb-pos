<?php

namespace App\Enums;

class PaymentMethod
{
    public const CASH = 'cash';

    public const QRIS = 'qris';

    public const DEBIT = 'debit';

    public const CREDIT = 'credit';

    public const TRANSFER = 'transfer';

    public static function values(): array
    {
        return [
            self::CASH,
            self::QRIS,
            self::DEBIT,
            self::CREDIT,
            self::TRANSFER,
        ];
    }
}