import { Cormorant_Garamond } from "next/font/google"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Michicosas — Gadgets y accesorios para gatos",
  description: "Tecnología y confort para tu gato. Envío gratis a LATAM.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={cormorant.variable}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
