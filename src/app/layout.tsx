import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "TWQR 收款碼產生器 | 台灣Pay QR Code產生器 | 轉帳小工具",
    description:
        "免費的台灣Pay QR Code收款碼產生器，支援所有主要銀行。快速生成TWQR收款碼，讓收款更簡單。支援自訂Logo、備註功能。",
    keywords: "TWQR, 台灣Pay, QR Code產生器, 轉帳小工具, 收款碼, 台灣銀行, QR碼生成器, 行動支付",
    authors: [{name: "LD"}],
    creator: "LD",
    publisher: "LD",
    robots: "index, follow",
    openGraph: {
        title: "TWQR 收款碼產生器 | 台灣Pay QR Code產生器",
        description: "免費的台灣Pay QR Code收款碼產生器，支援所有主要銀行。快速生成TWQR收款碼，讓收款更簡單。",
        url: "https://twqr-generator.playfuni.net",
        siteName: "TWQR 收款碼產生器",
        locale: "zh_TW",
        type: "website",
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-TW">
        <head>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#3B82F6"/>
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    )
}
