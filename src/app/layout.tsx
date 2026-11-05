import type React from "react"
import type {Metadata, Viewport} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {AUTHOR_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL} from "@/lib/site"

const inter = Inter({subsets: ["latin"], display: "swap"})

const OG_IMAGE = {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "TWQR 收款碼產生器：免費產生台灣 Pay 共通轉帳 QR Code",
}

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: ["TWQR", "台灣Pay", "收款碼", "QR Code產生器", "轉帳QR Code", "銀行轉帳", "行動支付"],
    authors: [{name: AUTHOR_NAME}],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            {url: "/favicon.ico", sizes: "any"},
            {url: "/icon-192.png", sizes: "192x192", type: "image/png"},
        ],
        apple: [{url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png"}],
    },
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: "/",
        siteName: SITE_NAME,
        locale: "zh_TW",
        type: "website",
        images: [OG_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [OG_IMAGE.url],
    },
    formatDetection: {
        telephone: false,
    },
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#3B82F6",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-TW">
        <body className={inter.className}>{children}</body>
        </html>
    )
}
