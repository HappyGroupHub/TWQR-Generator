import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import TWQRGeneratorTool from "@/components/TWQRGeneratorTool"
import Footer from "@/components/Footer"
import bankCodes from "@/data/bank-codes.json"
import {FAQ_ITEMS} from "@/content/faq"
import {
    AUTHOR_LINKS,
    AUTHOR_NAME,
    LAST_UPDATED,
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_URL,
} from "@/lib/site"

const STEPS = [
    {
        name: "選擇收款銀行",
        text: "在「銀行代碼」欄位輸入銀行代碼或名稱（例如 822 或 中國信託），從清單中選擇你的收款銀行。",
    },
    {
        name: "輸入收款帳號",
        text: "輸入或貼上 10 到 16 位數的銀行帳號，帳號中的連字號（-）會自動去除。",
    },
    {
        name: "設定金額與備註（選填）",
        text: "輸入收款金額（新台幣，上限 200 萬元），保持 0 則由付款人自行輸入；需要時再加上 19 字以內的備註。",
    },
    {
        name: "下載或複製收款碼",
        text: "右側會即時產生 TWQR 收款碼，可選擇加上 Logo，再按「下載」存成 PNG 圖片或按「複製」貼到聊天訊息中。",
    },
]

const bankEntries = Object.entries(bankCodes as Record<string, string>).sort(([a], [b]) => a.localeCompare(b))
const ePaymentNames = bankEntries.filter(([code]) => code.startsWith("3")).map(([, name]) => name)

const lastUpdatedLabel = LAST_UPDATED.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$1 年 $2 月 $3 日")

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: SITE_NAME,
            alternateName: "TWQR Generator",
            description: SITE_DESCRIPTION,
            inLanguage: "zh-TW",
            publisher: {"@id": `${SITE_URL}/#author`},
        },
        {
            "@type": "Person",
            "@id": `${SITE_URL}/#author`,
            name: AUTHOR_NAME,
            sameAs: AUTHOR_LINKS,
        },
        {
            "@type": "WebApplication",
            "@id": `${SITE_URL}/#app`,
            name: SITE_NAME,
            url: `${SITE_URL}/`,
            description: SITE_DESCRIPTION,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            browserRequirements: "需要支援 JavaScript 的現代瀏覽器",
            inLanguage: "zh-TW",
            isAccessibleForFree: true,
            offers: {"@type": "Offer", price: "0", priceCurrency: "TWD"},
            featureList: [
                "產生 TWQR 共通格式的銀行轉帳收款 QR Code",
                "內建本國銀行、信用合作社、農漁會、中華郵政與電子支付機構代碼",
                "可設定收款金額或由付款人自行輸入",
                "可加入備註",
                "可在 QR Code 中央加入 TWQR 圖示或自訂 Logo",
                "下載 PNG 或複製圖片",
                "所有資料只在瀏覽器中處理",
            ],
            author: {"@id": `${SITE_URL}/#author`},
            license: "https://opensource.org/licenses/MIT",
            dateModified: LAST_UPDATED,
        },
        {
            "@type": "HowTo",
            "@id": `${SITE_URL}/#howto`,
            name: "如何產生 TWQR 收款碼",
            description: "用 TWQR 收款碼產生器，四個步驟產生台灣共通的銀行轉帳 QR Code。",
            inLanguage: "zh-TW",
            estimatedCost: {"@type": "MonetaryAmount", currency: "TWD", value: "0"},
            tool: {"@type": "HowToTool", name: "可上網的瀏覽器"},
            step: STEPS.map((step, index) => ({
                "@type": "HowToStep",
                position: index + 1,
                name: step.name,
                text: step.text,
                url: `${SITE_URL}/#how-to-use`,
            })),
        },
        {
            "@type": "FAQPage",
            "@id": `${SITE_URL}/#faq`,
            inLanguage: "zh-TW",
            mainEntity: FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {"@type": "Answer", text: item.answer},
            })),
        },
    ],
}

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")}}
            />
            <main className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">TWQR 收款碼產生器</h1>
                    <p className="text-lg text-gray-600">快速生成台灣Pay QR Code收款碼，支援所有主要銀行</p>
                    <p className="text-sm text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                        這是一個免費的線上工具：選擇銀行、輸入帳號與金額，就能產生台灣共通的 TWQR 轉帳收款碼，
                        付款人用行動銀行 App 掃描即可轉帳。所有資料只在你的瀏覽器中處理。
                    </p>
                </header>

                <TWQRGeneratorTool/>

                <div className="mt-8 max-w-4xl mx-auto space-y-8">
                    {/* How to use */}
                    <Card>
                        <section id="how-to-use" aria-labelledby="how-to-use-title">
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-800">
                                    <h2 id="how-to-use-title">如何產生 TWQR 收款碼</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ol className="text-sm text-gray-600 space-y-3 leading-relaxed list-decimal pl-5">
                                    {STEPS.map((step) => (
                                        <li key={step.name}>
                                            <h3 className="inline font-medium text-gray-800">{step.name}：</h3>
                                            {step.text}
                                        </li>
                                    ))}
                                </ol>
                            </CardContent>
                        </section>
                    </Card>

                    {/* Supported banks */}
                    <Card>
                        <section id="supported-banks" aria-labelledby="supported-banks-title">
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-800">
                                    <h2 id="supported-banks-title">支援的銀行與格式</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                                    <p>
                                        工具內建 {bankEntries.length} 個金融機構代碼，涵蓋本國銀行、外商銀行、純網路銀行、信用合作社、
                                        農會、漁會、中華郵政，以及{ePaymentNames.join("、")}等電子支付機構。
                                    </p>
                                    <p>
                                        產生的 QR Code 採用 TWQR 共通格式的銀行轉帳內容，包含收款銀行代碼與帳號，並可選擇帶入金額與備註。
                                        付款人可用支援 TWQR 掃碼轉帳的行動銀行 App 掃描，實際支援情況以各銀行 App 為準。
                                    </p>
                                    <details className="rounded-md border border-gray-200 bg-white/60 p-3">
                                        <summary className="cursor-pointer font-medium text-gray-800">
                                            查看全部 {bankEntries.length} 個銀行代碼
                                        </summary>
                                        <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1">
                                            {bankEntries.map(([code, name]) => (
                                                <li key={code}>
                                                    <span className="text-blue-600">{code}</span> {name}
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </div>
                            </CardContent>
                        </section>
                    </Card>

                    {/* Privacy */}
                    <Card>
                        <section id="privacy" aria-labelledby="privacy-title">
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-800">
                                    <h2 id="privacy-title">隱私說明</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-gray-600 space-y-3 leading-relaxed list-disc pl-5">
                                    <li>QR Code 由瀏覽器中的 JavaScript 直接產生，銀行代碼、帳號、金額與備註不會傳送到伺服器。</li>
                                    <li>上傳的 Logo 圖片只在瀏覽器中讀取並合成到 QR Code 上，不會上傳。</li>
                                    <li>本站不使用帳號系統，也不會把輸入內容存到瀏覽器儲存空間，重新整理頁面後資料即清除。</li>
                                    <li>
                                        原始碼公開在{" "}
                                        <a
                                            href="https://github.com/HappyGroupHub/twqr-generator"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline hover:text-blue-800"
                                        >
                                            GitHub
                                        </a>
                                        ，可以自行檢查。
                                    </li>
                                </ul>
                            </CardContent>
                        </section>
                    </Card>

                    {/* FAQ */}
                    <Card>
                        <section id="faq" aria-labelledby="faq-title">
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-800">
                                    <h2 id="faq-title">常見問題</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-5">
                                    {FAQ_ITEMS.map((item) => (
                                        <div key={item.question}>
                                            <h3 className="text-base font-medium text-gray-800">{item.question}</h3>
                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </section>
                    </Card>

                    {/* Terms of Service */}
                    <Card>
                        <section id="terms" aria-labelledby="terms-title">
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-800">
                                    <h2 id="terms-title">使用條款</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                                    <p>
                                        1. 本服務產生的 QR Code 皆在您的瀏覽器中完成，我們不會紀錄任何您輸入的資料
                                    </p>
                                    <p>
                                        2. 轉帳前請務必在再次確認資訊的正確性，本站不負責任何財務損失
                                    </p>
                                    <p>
                                        3. 跨行轉帳手續費依各銀行公告為準，使用本服務即表示您同意上述條款
                                    </p>
                                </div>
                            </CardContent>
                        </section>
                    </Card>

                    <p className="text-center text-xs text-gray-500">
                        最後更新：<time dateTime={LAST_UPDATED}>{lastUpdatedLabel}</time>
                    </p>
                </div>
            </main>

            <Footer/>
        </div>
    )
}
