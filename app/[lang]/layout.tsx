import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getDictionary, type Locale } from "./dictionaries"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const { meta } = await getDictionary(lang as Locale)

  return {
    metadataBase: new URL("https://www.albertomanas.com"),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  // Esperar a que los parámetros estén disponibles
  const { lang } = await params

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
