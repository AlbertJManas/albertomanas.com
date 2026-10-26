"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LanguageSwitcherProps {
  currentLang: string
  label: string
}

export default function LanguageSwitcher({ currentLang, label }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    if (locale === currentLang) return

    // Ruta sin el prefijo de idioma
    const pathWithoutLocale = pathname.replace(/^\/(es|en)/, "") || ""

    // Navegar a la ruta del nuevo idioma
    router.push(`/${locale}${pathWithoutLocale}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8" aria-label={label}>
          <Image
            src={currentLang === "es" ? "/es.svg" : "/gb.svg"}
            alt={currentLang === "es" ? "Español" : "English"}
            width={24}
            height={24}
            className="rounded-sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("es")} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Image src="/es.svg" alt="" width={20} height={20} className="rounded-sm" />
            <span>Español</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("en")} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Image src="/gb.svg" alt="" width={20} height={20} className="rounded-sm" />
            <span>English</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
