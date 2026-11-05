import type {Metadata} from "next"
import Link from "next/link"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import Footer from "@/components/Footer"
import {SITE_NAME} from "@/lib/site"

export const metadata: Metadata = {
    title: `找不到頁面 (404)｜${SITE_NAME}`,
    description: "您造訪的頁面不存在，請返回 TWQR 收款碼產生器首頁繼續使用台灣 Pay 轉帳 QR Code 線上產生工具。",
    robots: {
        index: false,
        follow: true,
    },
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-between">
            <main className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
                <Card className="max-w-md w-full text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-800">
                            <h1>404 - 找不到頁面</h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            您要找的網址不存在或已經移除。您可以返回首頁繼續產生 TWQR 台灣 Pay 轉帳收款碼。
                        </p>
                        <div>
                            <Button asChild>
                                <Link href="/">返回 TWQR 收款碼產生器首頁</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer/>
        </div>
    )
}
