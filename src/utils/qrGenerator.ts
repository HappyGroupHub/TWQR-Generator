import QRCode from "qrcode"

export const generateQRCodeUrl = async (
    bankCode: string,
    account: string,
    amount: string,
    comment: string,
): Promise<string> => {
    if (!bankCode || !account) {
        return ""
    }


    // Check if the amount is smaller than or equal to 2,000,000
    const numericAmount = Number.parseInt(amount || "0")
    if (numericAmount > 2000000) return ""

    // Check if the account length is valid (10 to 16 characters)
    if (account.length < 10 || account.length > 16) return ""
    const formattedAccount = account.padStart(16, "0")

    let qrText = `TWQRP://BankTransfer/158/02/V1?D5=${bankCode}&D6=${formattedAccount}&D10=901`

    // Add D1(amount) only when the amount is greater than 0
    if (numericAmount > 0) {
        const amountInCents = (numericAmount * 100).toString()
        qrText += `&D1=${amountInCents}`
    }

    // Add D9(comment) only when comment is provided
    if (comment) {
        qrText += `&D9=${encodeURIComponent(comment)}`
    }

    try {
        return QRCode.toDataURL(qrText, {
            width: 300,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#FFFFFF",
            },
        });
    } catch (error) {
        console.error("QR碼生成失敗:", error)
        return ""
    }
}

export const addLogoToQR = async (qrUrl: string, logoOption: string, customLogo?: string): Promise<string> => {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const qrImg = new Image()

        qrImg.crossOrigin = "anonymous"
        qrImg.onload = () => {
            canvas.width = qrImg.width
            canvas.height = qrImg.height
            ctx?.drawImage(qrImg, 0, 0)

            if (logoOption === "twqr") {
                // TWQR logo
                const logoImg = new Image()
                logoImg.src = "/twqr.png"
                logoImg.crossOrigin = "anonymous"
                logoImg.onload = () => {
                    if (ctx) {
                        const logoSize = Math.min(qrImg.width, qrImg.height) * 0.2
                        const x = (qrImg.width - logoSize) / 2
                        const y = (qrImg.height - logoSize) / 2

                        ctx.fillStyle = "white"
                        ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10)
                        ctx.drawImage(logoImg, x, y, logoSize, logoSize)
                    }
                    resolve(canvas.toDataURL())
                }
            } else if (logoOption === "custom" && customLogo) {
                const logoImg = new Image()
                logoImg.crossOrigin = "anonymous"
                logoImg.onload = () => {
                    const logoSize = Math.min(qrImg.width, qrImg.height) * 0.2
                    const x = (qrImg.width - logoSize) / 2
                    const y = (qrImg.height - logoSize) / 2

                    if (ctx) {
                        ctx.fillStyle = "white"
                        ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10)
                        ctx.drawImage(logoImg, x, y, logoSize, logoSize)
                    }

                    resolve(canvas.toDataURL())
                }
                logoImg.src = customLogo
            } else {
                resolve(canvas.toDataURL())
            }
        }

        qrImg.src = qrUrl
    })
}
