"use client"

import type React from "react"
import {useState, useEffect, useRef} from "react"
import {Search} from "lucide-react"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import bankCodes from "@/data/bank-codes.json"

interface BankSelectorProps {
    value: string
    onChange: (code: string, name: string) => void
    error?: string
}

export default function BankSelector({value, onChange, error}: BankSelectorProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)
    const [filteredBanks, setFilteredBanks] = useState<Array<{ code: string; name: string }>>([])
    const [selectedBank, setSelectedBank] = useState<{ code: string; name: string } | null>(null)
    const [isInvalid, setIsInvalid] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Initial filter to show all banks
    useEffect(() => {
        const query = searchTerm.toLowerCase();
        const filtered = Object.entries(bankCodes)
            .map(([code, name]) => ({code, name}))
            .filter(({code, name}) => {
                const bankName = name.toLowerCase();
                const bankCode = code;
                const fullText = `${code} - ${name}`.toLowerCase();
                return fullText.includes(query);
            })
            .sort((a, b) => {
                const aFullText = `${a.code} - ${a.name}`.toLowerCase();
                const bFullText = `${b.code} - ${b.name}`.toLowerCase();

                // Priority: exact match first
                const aStartsWith = aFullText.startsWith(query);
                const bStartsWith = bFullText.startsWith(query);

                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;

                // Sort by numerical code if both match or neither match
                return a.code.localeCompare(b.code);
            });
        setFilteredBanks(filtered);
    }, [searchTerm]);

    // Update selected bank when value changes
    useEffect(() => {
        if (value && bankCodes[value as keyof typeof bankCodes]) {
            setSelectedBank({code: value, name: bankCodes[value as keyof typeof bankCodes]})
            setSearchTerm("")
            setIsInvalid(false)
        } else {
            setSelectedBank(null)
        }
    }, [value])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false)
            }
        }

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showDropdown])

    const handleBankSelect = (code: string, name: string) => {
        setSelectedBank({code, name})
        setSearchTerm("")
        setShowDropdown(false)
        onChange(code, name)
        setIsInvalid(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        setSearchTerm(inputValue)
        setShowDropdown(true)

        const isMatched = Object.entries(bankCodes).some(
            ([code, name]) => `${code} - ${name}` === inputValue
        );

        if (selectedBank && inputValue !== `${selectedBank.code} - ${selectedBank.name}`) {
            setSelectedBank(null)
            onChange("", "")
        }

        if (!inputValue) {
            setSelectedBank(null)
            onChange("", "")
        }
        setIsInvalid(!isMatched && inputValue !== "")
    }

    const handleInputFocus = () => {
        setShowDropdown(true)
        // Don't clear searchTerm when focusing - let user edit the current value
        if (selectedBank) {
            setSearchTerm(`${selectedBank.code} - ${selectedBank.name}`)
        }
    }

    const displayValue = selectedBank ? `${selectedBank.code} - ${selectedBank.name}` : searchTerm

    return (
        <div className="relative">
            <Label htmlFor="bankCode" className="text-sm font-medium text-gray-700">
                銀行代碼 *
            </Label>
            <div className="relative">
                <Input
                    ref={inputRef}
                    id="bankCode"
                    value={displayValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="選擇銀行代碼/名稱"
                    className={`pr-10 ${selectedBank ? "text-blue-600 font-medium" : ""} ${isInvalid ? "text-red-500" : ""}`}
                />
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400"/>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {showDropdown && filteredBanks.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                >
                    {filteredBanks.map(({code, name}) => (
                        <button
                            key={code}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 transition-colors"
                            onClick={() => handleBankSelect(code, name)}
                        >
                            <span className="font-medium text-blue-600">{code}</span>
                            <span className="text-gray-600"> - {name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}