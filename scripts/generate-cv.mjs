// Genera public/cv-alberto-manas-{es,en}.pdf a partir de los diccionarios de la web.
// El contenido va en una sola columna para que los ATS extraigan el texto en el orden correcto.
// Uso: npm run cv  (requiere Edge o Chrome; se puede indicar la ruta con CHROME_PATH)

import { execFileSync } from "node:child_process"
import { existsSync, statSync } from "node:fs"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const browserCandidates = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
]

// Iconos de Lucide (ISC) para los datos de contacto
const icons = {
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  location: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  web: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// En Windows el ejecutable del navegador devuelve el control antes de terminar de escribir el PDF
async function waitForFile(file, timeout = 30000) {
  let lastSize = -1
  for (const start = Date.now(); Date.now() - start < timeout; await sleep(500)) {
    const size = existsSync(file) ? statSync(file).size : -1
    if (size > 0 && size === lastSize) return true
    lastSize = size
  }
  return false
}

const escape = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")

const displayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

const link = (href, text = displayUrl(href)) => `<a href="${escape(href)}">${escape(text)}</a>`

const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`

function renderCv(dict, profile, lang) {
  const { cv, experience } = dict

  const contact = [
    [icon("mail"), link(`mailto:${profile.email}`, profile.email)],
    [icon("phone"), escape(profile.phone)],
    [icon("location"), escape(cv.location)],
    [icon("linkedin"), link(profile.linkedin)],
    [icon("web"), link(profile.website)],
  ]

  const roles = experience.roles
    .map(
      (role) => `
      <article class="role">
        <h3>${escape(role.role)}</h3>
        <p class="meta"><strong>${role.url ? link(role.url, role.company) : escape(role.company)}</strong> <span class="sep">|</span> ${escape(role.period)}</p>
        <p>${escape(role.description)}</p>
        ${role.highlights.length ? `<ul>${role.highlights.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>` : ""}
        <p class="tech">${escape(cv.technologies)}: ${escape(role.tags.join(", "))}</p>
      </article>`,
    )
    .join("")

  const skills = cv.skills
    .map((group) => `<li><strong>${escape(group.title)}:</strong> ${escape(group.items.join(", "))}</li>`)
    .join("")

  const education = cv.education
    .map(
      (entry) => `
      <div class="entry">
        <h3>${escape(entry.title)}</h3>
        <p class="meta"><strong>${escape(entry.school)}</strong> <span class="sep">|</span> ${escape(entry.period)}</p>
      </div>`,
    )
    .join("")

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${escape(cv.title)}</title>
<meta name="author" content="${escape(`${profile.givenName} ${profile.familyName}`)}">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@300;400&display=block">
<style>
  @page { size: A4; margin: 12mm 15mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html {
    font-family: "Inter", "Segoe UI", Arial, sans-serif;
    font-size: 9.2pt;
    line-height: 1.45;
    color: #3d4046;
    font-variant-ligatures: none;
  }
  a { color: inherit; text-decoration: none; }
  strong { font-weight: 600; color: #2b2d31; }

  .top { display: flex; align-items: center; justify-content: space-between; gap: 18pt; }
  .eyebrow { font-size: 10pt; text-transform: uppercase; color: #55585e; }
  h1 {
    margin-top: 3pt;
    font-family: "Oswald", "Arial Narrow", sans-serif;
    font-weight: 300;
    font-size: 32pt;
    line-height: 1.16;
    text-transform: uppercase;
    color: #3d4046;
  }
  h1 span { display: block; }
  .photo { width: 31mm; height: 31mm; flex-shrink: 0; border-radius: 50%; object-fit: cover; }

  .contact {
    display: flex;
    flex-wrap: wrap;
    gap: 3pt 14pt;
    margin-top: 11pt;
    padding: 7pt 0;
    border-top: 2pt solid #e2e2e2;
    list-style: none;
    font-size: 8.3pt;
  }
  /* Cada dato en una sola línea: una URL partida se extrae mal */
  .contact li { display: flex; align-items: center; gap: 4pt; white-space: nowrap; }
  .contact svg { width: 9pt; height: 9pt; fill: none; stroke: #6d7076; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

  section { padding-top: 9pt; margin-top: 9pt; border-top: 2pt solid #e2e2e2; }
  /* Sin letter-spacing: los extractores de texto de los ATS lo convierten en espacios ("PERFI L") */
  h2 { margin-bottom: 6pt; font-size: 11.5pt; font-weight: 400; text-transform: uppercase; color: #3d4046; }
  h3 { font-size: 9.2pt; font-weight: 700; text-transform: uppercase; color: #2b2d31; }
  .meta { margin-top: 1pt; color: #55585e; }
  .sep { margin: 0 3pt; color: #a5a8ad; }

  .role { break-inside: avoid; }
  .role + .role { margin-top: 10pt; }
  .role > p:not(.meta) { margin-top: 3pt; }
  .role ul { margin-top: 3pt; padding-left: 10pt; color: #55585e; }
  .role li + li { margin-top: 1pt; }
  li::marker { color: #a5a8ad; }
  .tech { margin-top: 3pt; font-size: 8.4pt; color: #75787e; }

  /* Habilidades en una sola columna: en dos, los ATS mezclan las líneas de ambas */
  .skills { list-style: none; }
  .skills li + li { margin-top: 2pt; }
  .entry + .entry { margin-top: 6pt; }
</style>
</head>
<body>
  <header>
    <div class="top">
      <div>
        <p class="eyebrow">${escape(cv.headline)}</p>
        <h1><span>${escape(profile.givenName)}</span> <span>${escape(profile.familyName)}</span></h1>
      </div>
      <img class="photo" src="${pathToFileURL(path.join(root, profile.photo)).href}" alt="">
    </div>
    <ul class="contact">${contact.map(([svg, text]) => `<li>${svg}<span>${text}</span></li>`).join("")}</ul>
  </header>
  <section>
    <h2>${escape(cv.summaryTitle)}</h2>
    <p>${escape(cv.summary)}</p>
  </section>
  <section>
    <h2>${escape(cv.experienceTitle)}</h2>
    ${roles}
  </section>
  <section>
    <h2>${escape(cv.skillsTitle)}</h2>
    <ul class="skills">${skills}</ul>
  </section>
  <section>
    <h2>${escape(cv.educationTitle)}</h2>
    ${education}
  </section>
  <section>
    <h2>${escape(cv.languagesTitle)}</h2>
    <p>${escape(cv.languages.join(" · "))}</p>
  </section>
</body>
</html>`
}

async function main() {
  const browser = browserCandidates.find((candidate) => candidate && existsSync(candidate))
  if (!browser) throw new Error("No se ha encontrado Edge ni Chrome. Indica la ruta con CHROME_PATH.")

  const profile = JSON.parse(await readFile(path.join(root, "scripts/cv-profile.json"), "utf8"))
  const workDir = await mkdtemp(path.join(tmpdir(), "cv-"))

  try {
    for (const lang of ["es", "en"]) {
      const dict = JSON.parse(await readFile(path.join(root, `app/[lang]/dictionaries/${lang}.json`), "utf8"))
      const htmlPath = path.join(workDir, `cv-${lang}.html`)
      const pdfPath = path.join(root, `public/cv-alberto-manas-${lang}.pdf`)

      await writeFile(htmlPath, renderCv(dict, profile, lang))
      await rm(pdfPath, { force: true })

      // Perfil temporal propio para que el modo headless no se acople a una ventana abierta del navegador
      execFileSync(browser, [
        "--headless=new",
        "--disable-gpu",
        `--user-data-dir=${path.join(workDir, `profile-${lang}`)}`,
        "--no-pdf-header-footer",
        "--virtual-time-budget=10000",
        `--print-to-pdf=${pdfPath}`,
        pathToFileURL(htmlPath).href,
      ], { stdio: "ignore" })

      if (!(await waitForFile(pdfPath))) throw new Error(`No se ha generado ${pdfPath}`)
      console.log(`✓ ${path.relative(root, pdfPath)}`)
    }
  } finally {
    await rm(workDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 })
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
