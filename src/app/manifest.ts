import type {MetadataRoute} from "next"
import {SITE_DESCRIPTION, SITE_NAME} from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_NAME,
        short_name: "TWQR 產生器",
        description: SITE_DESCRIPTION,
        start_url: "/",
        display: "standalone",
        background_color: "#EFF6FF",
        theme_color: "#3B82F6",
        lang: "zh-TW",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    }
}
