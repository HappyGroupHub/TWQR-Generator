"use client"

import type React from "react"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

interface AmountInputProps {
    value: string
    onChange: (value: string) => void
    error?: string
}

export default function AmountInput({value, onChange, error}: AmountInputProps) {
    const formatNumber = (num: string) => {
        if (!num) return ""
        // Add commas to number string
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const parseNumber = (str: string) => {
        // Remove commas and non-digit characters
        return str.replace(/,/g, "").replace(/\D/g, "")
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        let numericValue = parseNumber(rawValue);

        // Prevent user add zero at the beginning
        if (numericValue.length > 1 && numericValue.startsWith("0")) {
            numericValue = numericValue.substring(1);
        }

        onChange(numericValue);
    };

    const showZeroHint = value === "0" || value === ""

    return (
        <div>
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                收款金額 (新台幣) *
            </Label>
            <Input
                id="amount"
                value={formatNumber(value)}
                onChange={handleAmountChange}
                placeholder="輸入收款金額"
                maxLength={9} // 2,000,000 is 9 chars with commas
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {showZeroHint && !error && (
                <p className="text-green-600 text-sm mt-1">收款金額為 0 時，對方可自行輸入</p>
            )}
        </div>
    )
}