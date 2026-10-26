import type { Dictionary } from "@/app/[lang]/dictionaries"

export default function Footer({ dictionary }: { dictionary: Dictionary["footer"] }) {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-foreground/60">
        <p>© {new Date().getFullYear()} Alberto Mañas</p>
        <a href="#top" className="hover:text-foreground transition-colors">
          {dictionary.backToTop} ↑
        </a>
      </div>
    </footer>
  )
}
