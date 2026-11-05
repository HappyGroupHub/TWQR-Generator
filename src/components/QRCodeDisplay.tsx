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
        <Card className="w-full shadow-md border-slate-200/90 flex flex-col">
            <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-xl font-semibold text-gray-800"><h2>收款QR碼</h2></CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center space-y-5 pt-6">
                {qrCodeUrl ? (
                    <>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80">
                            <img src={qrCodeUrl || "/twqr.png"} alt="產生的 TWQR 收款 QR Code" width={256} height={256} className="w-64 h-64 rounded-md"/>
                        </div>
                        <div className="flex gap-3 w-64">
                            <Button onClick={copyQRCode} variant="outline"
                                    className="flex-1 flex items-center justify-center gap-2 bg-white">
                                {copied ? <Check className="w-4 h-4 text-emerald-600"/> : <Copy className="w-4 h-4"/>}
                                {copied ? "已複製" : "複製"}
                            </Button>
                            <Button onClick={downloadQRCode} className="flex-1 flex items-center justify-center gap-2">
                                <Download className="w-4 h-4"/>
                                下載
                            </Button>
                        </div>
                    </>
                ) : (
                    <div
                        className="w-64 h-64 border-2 border-dashed border-slate-300 bg-slate-50/70 rounded-xl flex items-center justify-center p-6">
                        <p className="text-gray-500 text-sm text-center leading-relaxed">
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
