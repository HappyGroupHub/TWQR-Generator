// FAQ content. Rendered on the page and reused for FAQPage JSON-LD,
// so the structured data always matches the visible text.
// Every answer must reflect the actual behaviour of the code.

export interface FaqItem {
    question: string
    answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: "TWQR 收款碼是什麼？",
        answer:
            "TWQR 是台灣金融機構共通的 QR Code 支付格式（台灣 Pay 也採用這個格式）。轉帳用的 TWQR 收款碼裡記錄了收款銀行代碼、帳號，以及選填的金額與備註，付款人用支援 TWQR 掃碼轉帳的行動銀行 App 掃描後，就能直接帶入轉帳資料。",
    },
    {
        question: "使用這個收款碼產生器要付費或註冊嗎？",
        answer:
            "不用。本工具完全免費，不需要註冊或登入，打開網頁輸入資料就能產生收款碼。原始碼以 MIT 授權公開在 GitHub。",
    },
    {
        question: "我輸入的銀行帳號會被上傳或儲存嗎？",
        answer:
            "不會。QR Code 是在你的瀏覽器裡用 JavaScript 直接產生的，銀行代碼、帳號、金額、備註和上傳的 Logo 都不會傳送到伺服器，本站也不會記錄這些資料。關閉或重新整理頁面後，輸入的內容就會消失。",
    },
    {
        question: "收款金額可以不填嗎？",
        answer:
            "可以。金額保持 0 時，產生的收款碼不會帶入金額，付款人掃描後可以自行輸入要轉帳的金額，適合當作固定張貼的收款碼。",
    },
    {
        question: "金額和備註有什麼限制？",
        answer:
            "本工具的金額以新台幣整數元計算，單筆上限設定為 200 萬元；備註最多 19 個字元。實際可轉帳的額度依付款人所使用的銀行規定為準。",
    },
    {
        question: "支援哪些銀行？",
        answer:
            "工具內建完整的金融機構代碼清單，包含本國銀行、信用合作社、農會、漁會、中華郵政與電子支付機構，可以輸入代碼或名稱搜尋。銀行帳號需為 10 到 16 位數字。",
    },
    {
        question: "可以在 QR Code 中間加上 Logo 嗎？",
        answer:
            "可以。可選擇不加、加上 TWQR 圖示，或上傳自己的圖片，Logo 會放在 QR Code 正中央。加上 Logo 會遮住部分圖案，建議產生後先用手機掃描測試，確認可以正常讀取再使用。",
    },
    {
        question: "用 TWQR 收款碼轉帳需要手續費嗎？",
        answer:
            "本工具只負責產生收款碼，不經手任何款項。跨行轉帳手續費依付款人所使用銀行的公告為準。",
    },
]
