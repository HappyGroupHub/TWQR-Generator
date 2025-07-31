"use client"

import type React from "react"

import {useRef} from "react"
import {Upload} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"

interface LogoSelectorProps {
    value: string
    onChange: (option: string) => void
    onCustomLogoUpload: (logoUrl: string) => void
}

export default function LogoSelector({value, onChange, onCustomLogoUpload}: LogoSelectorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const logoUrl = e.target?.result as string
                onCustomLogoUpload(logoUrl)
                onChange("custom")
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">加入自訂 Logo</Label>
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant={value === "none" ? "default" : "outline"}
                    onClick={() => onChange("none")}
                    className="flex-1"
                >
                    無
                </Button>
                <Button
                    type="button"
                    variant={value === "twqr" ? "default" : "outline"}
                    onClick={() => onChange("twqr")}
                    className="flex-1"
                >
                    TWQR 圖示
                </Button>
                <Button
                    type="button"
                    variant={value === "custom" ? "default" : "outline"}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                >
                    <Upload className="w-4 h-4 mr-2"/>
                    上傳檔案
                </Button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden"/>
        </div>
    )
}
