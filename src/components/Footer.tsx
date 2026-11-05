import {Github, Linkedin} from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/80 py-8 mt-14">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-base font-semibold text-gray-800">TWQR 收款碼產生器</p>
                        <p className="text-xs text-gray-500 mt-0.5">Made by LD</p>
                    </div>

                    <nav aria-label="頁尾導覽" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-600">
                        <a href="#how-to-use" className="hover:text-blue-600 transition-colors">使用教學</a>
                        <a href="#supported-banks" className="hover:text-blue-600 transition-colors">支援銀行</a>
                        <a href="#privacy" className="hover:text-blue-600 transition-colors">隱私說明</a>
                        <a href="#faq" className="hover:text-blue-600 transition-colors">常見問題</a>
                        <a href="#terms" className="hover:text-blue-600 transition-colors">使用條款</a>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <a
                            href="https://github.com/HappyGroupHub/twqr-generator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1.5 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Github className="w-4 h-4"/>
                            <span className="text-sm">GitHub</span>
                        </a>

                        <a
                            href="https://linkedin.com/in/ld-chi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1.5 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Linkedin className="w-4 h-4"/>
                            <span className="text-sm">LinkedIn</span>
                        </a>
                    </div>
                </div>

                <div className="text-center mt-6 pt-4 border-t border-slate-200/70">
                    <p className="text-xs text-gray-500">© 2026 TWQR 收款碼產生器. An open source MIT License
                        project.</p>
                </div>
            </div>
        </footer>
    )
}
