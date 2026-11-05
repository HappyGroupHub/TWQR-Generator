"use client"

import {useState, useEffect} from "react"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import BankSelector from "@/components/BankSelector"
import AmountInput from "@/components/AmountInput"
import QRCodeDisplay from "@/components/QRCodeDisplay"
import LogoSelector from "@/components/LogoSelector"
import {generateQRCodeUrl, addLogoToQR} from "@/utils/qrGenerator"

// Interactive generator. All QR code generation happens in the browser.
export default function TWQRGeneratorTool() {
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
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
            <Card className="w-full shadow-md border-slate-200/90">
                <CardHeader className="pb-4 border-b border-slate-100">
                    <CardTitle className="text-xl font-semibold text-gray-800"><h2>收款資訊設定</h2></CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-5">
                    {/* Bank Code */}
                    <BankSelector value={bankCode} onChange={handleBankChange}/>

                    {/* Bank Account */}
                    <div className="space-y-1.5">
                        <Label htmlFor="account" className="text-sm font-medium text-gray-700 block">
                            收款帳號 *
                        </Label>
                        <Input
                            id="account"
                            value={account}
                            onChange={(e) => handleAccountChange(e.target.value)}
                            onBlur={handleAccountBlur}
                            placeholder="輸入或貼上您的收款銀行帳號"
                        />
                        {errors.account && <p className="text-red-500 text-xs mt-1">{errors.account}</p>}
                    </div>

                    {/* Amount */}
                    <AmountInput value={amount} onChange={handleAmountChange} error={errors.amount}/>

                    {/* Comment */}
                    <div className="space-y-1.5">
                        <Label htmlFor="comment" className="text-sm font-medium text-gray-700 block">
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
                        <div className="flex justify-between items-center pt-0.5">
                            {errors.comment && <p className="text-red-500 text-xs">{errors.comment}</p>}
                            <p className="text-gray-400 text-xs ml-auto">{comment.length}/19</p>
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
    )
}
