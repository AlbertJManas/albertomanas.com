import { type NextRequest, NextResponse } from "next/server"
import Negotiator from "negotiator"

// Lista de idiomas soportados
const locales = ["es", "en"]
const defaultLocale = "es"

// Implementación manual de `match`
function matchUserLocale(acceptedLanguages: string[], supportedLocales: string[], defaultLocale: string) {
  return acceptedLanguages.find(lang => supportedLocales.includes(lang)) || defaultLocale
}

// Función para obtener el idioma preferido del usuario
function getLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameLocale) return pathnameLocale

  // Si no hay idioma en la URL, usar las cabeceras de aceptación
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  try {
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    return matchUserLocale(languages, locales, defaultLocale)
  } catch (error) {
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verificar si la ruta ya tiene un locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // Si ya tiene un locale, no hacemos nada
  if (pathnameHasLocale) return NextResponse.next()

  // Si la ruta apunta a un archivo estático en `public/`, ignoramos la redirección
  if (/\.(png|jpg|jpeg|gif|webp|svg|ico|txt|json|woff2|pdf?)$/i.test(pathname)) {
    return NextResponse.next()
  }

  // Redireccionar si no hay locale en la ruta
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)

  // Preservar los parámetros de búsqueda
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value)
  })

  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|public|favicon.ico).*)",
  ],
}
