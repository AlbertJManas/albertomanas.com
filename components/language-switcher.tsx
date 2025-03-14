"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LanguageSwitcherProps {
  currentLang: string
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    if (locale === currentLang) return

    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(/^\/(es|en)/, "") || ""

    // Navigate to the new locale path
    router.push(`/${locale}${pathWithoutLocale}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
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
            <Image src="/es.svg" alt="Español" width={20} height={20} className="rounded-sm" />
            <span>Español</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("en")} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Image src="/gb.svg" alt="English" width={20} height={20} className="rounded-sm" />
            <span>English</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

