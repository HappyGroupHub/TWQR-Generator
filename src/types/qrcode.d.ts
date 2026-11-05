declare module "qrcode" {
    export interface QRCodeRenderersOptions {
        width?: number
        margin?: number
        color?: {
            dark?: string
            light?: string
        }
    }
    export function toDataURL(text: string, options?: QRCodeRenderersOptions): Promise<string>
    const QRCode: {
        toDataURL: typeof toDataURL
    }
    export default QRCode
}
