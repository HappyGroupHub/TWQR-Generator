"use client"

import {useState, useEffect} from "react"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import BankSelector from "@/components/BankSelector"
import AmountInput from "@/components/AmountInput"
import QRCodeDisplay from "@/components/QRCodeDisplay"
import LogoSelector from "@/components/LogoSelector"
import Footer from "@/components/Footer"
import {generateQRCodeUrl, addLogoToQR} from "@/utils/qrGenerator"

export default function TWQRGenerator() {
    const [bankCode, setBankCode] = useState("")
    const [account, setAccount] = useState("")
    const [amount, setAmount] = useState("0")
    const [comment, setComment] = useState("")
    const [logoOption, setLogoOption] = useState("none")
    const [customLogo, setCustomLogo] = useState<string | null>(null)
    const [qrCodeUrl, setQrCodeUrl] = useState("")
    const [errors, setErrors] = useState({
        account: "",
        amount: "",
        comment: "",
    })

    // QR code generation
    useEffect(() => {
        const generateQR = async () => {
            // Only generate QR if there are no errors
            if (errors.account || errors.amount || errors.comment) {
                setQrCodeUrl("");
                return;
            }
            const baseQrUrl = await generateQRCodeUrl(bankCode, account, amount, comment)

            if (baseQrUrl && logoOption !== "none") {
                const qrWithLogo = await addLogoToQR(baseQrUrl, logoOption, customLogo || undefined)
                setQrCodeUrl(qrWithLogo)
            } else {
                setQrCodeUrl(baseQrUrl)
            }
        }

        generateQR()
    }, [bankCode, account, amount, comment, logoOption, customLogo, errors])

    const handleBankChange = (code: string, name: string) => {
        setBankCode(code)
    }

    const handleAccountChange = (value: string) => {
        const numberBlocks = value.match(/[\d-]+/g) || [];
        let cleanedAccount = "";

        if (numberBlocks.length > 0) {
            const longestBlock = numberBlocks.reduce((a, b) => (a.length > b.length ? a : b));
            cleanedAccount = longestBlock.replace(/\D/g, '');
        }

        setAccount(cleanedAccount);

        // Immediate validation for account length
        if (cleanedAccount.length > 16) {
            setErrors((prev) => ({...prev, account: "銀行帳號需介於 10 到 16 位數之間"}));
        } else {
            // Clear error if length is valid
            setErrors((prev) => ({...prev, account: ""}));
        }
    };

    const handleAccountBlur = () => {
        // On blur, check for minimum length if the field is not empty
        if (account && account.length < 10) {
            setErrors((prev) => ({...prev, account: "銀行帳號需介於 10 到 16 位數之間"}));
        }
    }

    const handleAmountChange = (value: string) => {
        let numericValue = value;
        if (numericValue.length > 1 && numericValue.startsWith("0")) {
            numericValue = numericValue.replace(/^0+/, '');
        }

        const numValue = Number.parseInt(numericValue || "0")
        if (numValue > 2000000) {
            setErrors((prev) => ({...prev, amount: "單筆收款金額上限為: 200萬元"}))
        } else {
            setErrors((prev) => ({...prev, amount: ""}))
            setAmount(numericValue)
        }
    }

    const handleCommentChange = (value: string) => {
        setComment(value)
        setErrors((prev) => ({...prev, comment: ""}))
    }

    const handleCommentBlur = () => {
        if (comment.length > 19) {
            setErrors((prev) => ({...prev, comment: `備註過長！${comment.length}/19 字元上限`}))
        } else {
            setErrors((prev) => ({...prev, comment: ""}))
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">TWQR 收款碼產生器</h1>
                    <p className="text-lg text-gray-600">快速生成台灣Pay QR Code收款碼，支援所有主要銀行</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-2xl text-gray-800">收款資訊設定</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Bank Code */}
                            <BankSelector value={bankCode} onChange={handleBankChange}/>

                            {/* Bank Account */}
                            <div>
                                <Label htmlFor="account" className="text-sm font-medium text-gray-700">
                                    收款帳號 *
                                </Label>
                                <Input
                                    id="account"
                                    value={account}
                                    onChange={(e) => handleAccountChange(e.target.value)}
                                    onBlur={handleAccountBlur}
                                    placeholder="輸入或貼上您的收款銀行帳號"
                                />
                                {errors.account && <p className="text-red-500 text-sm mt-1">{errors.account}</p>}
                            </div>

                            {/* Amount */}
                            <AmountInput value={amount} onChange={handleAmountChange} error={errors.amount}/>

                            {/* Comment */}
                            <div>
                                <Label htmlFor="comment" className="text-sm font-medium text-gray-700">
                                    備註 (選填)
                                </Label>
                                <Input
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => handleCommentChange(e.target.value)}
                                    onBlur={handleCommentBlur}
                                    placeholder="輸入備註資訊"
                                    maxLength={19}
                                />
                                <div className="flex justify-between items-center mt-1">
                                    {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
                                    <p className="text-gray-400 text-sm ml-auto">{comment.length}/19</p>
                                </div>
                            </div>

                            {/* Optional Logo Selection */}
                            <LogoSelector value={logoOption} onChange={setLogoOption}
                                          onCustomLogoUpload={setCustomLogo}/>
                        </CardContent>
                    </Card>

                    {/* QR Code Display */}
                    <QRCodeDisplay qrCodeUrl={qrCodeUrl}/>
                </div>

                {/* Terms of Service */}
                <Card className="mt-8 max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-xl text-gray-800">使用條款</CardTitle>
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
                </Card>
            </div>

            <Footer/>
        </div>
    )
}