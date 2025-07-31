import {Github, Linkedin} from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold text-gray-800">TWQR 收款碼產生器</h3>
                        <p className="text-sm text-gray-600">Made by LD</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            href="https://github.com/HappyGroupHub/twqr-generator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <Github className="w-5 h-5"/>
                            <span className="text-sm">GitHub</span>
                        </a>

                        <a
                            href="https://linkedin.com/in/ld-chi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <Linkedin className="w-5 h-5"/>
                            <span className="text-sm">LinkedIn</span>
                        </a>
                    </div>
                </div>

                <div className="text-center mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">© 2025 TWQR 收款碼產生器. An open source MIT License
                        project.</p>
                </div>
            </div>
        </footer>
    )
}
