"use client"

import {useState} from "react"
import {Download, Copy, Check} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

interface QRCodeDisplayProps {
    qrCodeUrl: string
}

export default function QRCodeDisplay({qrCodeUrl}: QRCodeDisplayProps) {
    const [copied, setCopied] = useState(false)

    const copyQRCode = async () => {
        if (qrCodeUrl) {
            try {
                const response = await fetch(qrCodeUrl)
                const blob = await response.blob()
                await navigator.clipboard.write([new ClipboardItem({"image/png": blob})])
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (error) {
                console.error("複製失敗:", error)
            }
        }
    }

    const downloadQRCode = () => {
        if (qrCodeUrl) {
            const link = document.createElement("a")
            link.download = "TWQR收款碼.png"
            link.href = qrCodeUrl
            link.click()
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-gray-800">收款QR碼</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                {qrCodeUrl ? (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <img src={qrCodeUrl || "/twqr.png"} alt="TWQR收款碼" className="w-64 h-64"/>
                        </div>
                        <div className="flex gap-4">
                            <Button onClick={copyQRCode} variant="outline"
                                    className="flex items-center gap-2 bg-transparent">
                                {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                                {copied ? "已複製" : "複製"}
                            </Button>
                            <Button onClick={downloadQRCode} className="flex items-center gap-2">
                                <Download className="w-4 h-4"/>
                                下載
                            </Button>
                        </div>
                    </>
                ) : (
                    <div
                        className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 text-center">
                            請填寫必要資訊
                            <br/>
                            即可生成QR碼
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
