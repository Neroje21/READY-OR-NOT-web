# Ready or Not – Guide

# Made by Tomáš Linka & Alex Solnař

Neoficiální webový průvodce hrou **Ready or Not** od studia VOID Interactive. Stránka poskytuje přehled všech herních map (Base Game) včetně cílů mise, počtu podezřelých a civilistů a interaktivních plánů pater. Dále obsahuje databázi zbraní s doporučeným loadoutem a statistikami.

**Živý web (GitHub Pages):** https://neroje21.github.io/READY-OR-NOT-web/

---

## Použité technologie

| Technologie | Verze / poznámka |
|---|---|
| HTML5 | Sémantické tagy, strukturovaný obsah |
| CSS3 | Flexbox, Grid, animace, media queries |
| JavaScript (Vanilla) | ES6+, bez externích frameworků |
| Google Fonts – Rajdhani | 300, 400, 500, 600, 700 |
| Font Awesome | 6.4.0 (CDN) – ikony v patičce |
| Visual Studio Code | v1.96+ s rozšířením Live Server |
| Git / GitHub Pages | Správa verzí a hosting |

---

## Adresářová struktura

```
READY-OR-NOT-web/
│
├── index.html                  # Hlavní stránka – navigace + hero + patička
├── sitemap.xml                 # Mapa webu pro vyhledávače
├── robots.txt                  # Instrukce pro web crawlery
├── README.md                   # Tato dokumentace
│
├── main/
│   ├── CSS/
│   │   └── style.css           # Globální styly (navigace, hero, patička)
│   │
│   ├── maps/
│   │   └── Base Game/
│   │       └── {KOD}/          # Složka každé mapy (např. 23MB, TYCA, ...)
│   │           ├── html/
│   │           │   └── index.html   # Stránka mapy
│   │           ├── css/
│   │           │   └── style.css    # Styly specifické pro mapy
│   │           └── js/
│   │               └── script.js    # Scroll navigace + přepínač pater
│   │
│   └── weapons/
│       └── {Kategorie}/        # Assault_Rifle, Battle_Rifle, PDW, SMG,
│           └── {Zbran}/        #   Shotgun, Sidearm, less-lethal
│               ├── index.html  # Stránka zbraně
│               └── style.css   # Styly specifické pro zbraně
│
└── IMG/
    ├── main/                   # Loga projektu
    ├── map/
    │   ├── thumbnails/         # Náhledové obrázky map (preview)
    │   └── layouts/            # Půdorysy pater (ground, floor1, floor2, ...)
    └── weapon/
        ├── gun/                # Fotografie zbraní (assault rifle, SMG, ...)
        ├── optic/              # Optiky (mířidla)
        ├── muzzle/             # Hlavňové doplňky (tlumič, kompenzátor, ...)
        ├── grip/               # Rukojeti
        └── other/              # Ostatní příslušenství (laser, svítilna, ...)
```

**Celkový počet stránek:** 70 (1 hlavní + 18 map + 51 zbraní)

---

## Technický rozbor

### 1. Responzivní design (Media Queries)

**Teoretický popis:**
Responzivní design zajišťuje, že web vypadá správně na všech zařízeních – od mobilního telefonu přes tablet až po desktopový monitor. Používáme přístup *desktop-first* s třemi zlomovými body (breakpointy): 1024 px (tablet), 768 px (velký mobil) a 480 px (malý mobil). Každý breakpoint upravuje velikosti písma, padding a rozložení prvků.

**Code snippet:**
```css
/* Hlavní stránka – main/CSS/style.css */

/* Desktop – výchozí stav */
.hero-title {
    font-size: 8rem;
    letter-spacing: 0.2em;
}

/* Tablet */
@media screen and (max-width: 1024px) {
    .hero-title { font-size: 5.5rem; }
    .hero-subtitle { font-size: 3rem; }
}

/* Velký mobil */
@media screen and (max-width: 768px) {
    .hero-title { font-size: 3.5rem; }
    .hero-section { height: 70vh; }
    .main-menu { gap: 20px; padding: 12px 0; }
}

/* Malý mobil */
@media screen and (max-width: 480px) {
    .hero-title { font-size: 2.5rem; }
    .hero-subtitle { font-size: 1.3rem; }
}
```

Stránky map mají vlastní breakpoint na 900 px, kde se layout přepne z `row-reverse` na sloupcové zobrazení, aby byl obrázek mapy čitelný na malém displeji:

```css
/* main/maps/Base Game/{KOD}/css/style.css */
@media (max-width: 900px) {
    .backround {
        flex-direction: column;
        align-items: center;
        padding: 100px 20px 40px 20px;
    }
    .container, img {
        max-width: 100%;
        width: 100%;
    }
}
```

---

### 2. CSS-only víceúrovňová dropdown navigace

**Teoretický popis:**
Navigace je plně funkční bez JavaScriptu – využívá CSS selektor `li:hover > ul` pro zobrazení vnořených menu. Animace jsou řešeny přes `visibility`, `opacity` a `transform`, což umožňuje plynulý přechod (transition) i při skrývání prvku (`display: none` neumožňuje animaci, ale `visibility: hidden` ano). Navigace je sticky – zůstává viditelná při rolování stránky.

**Code snippet:**
```css
/* main/CSS/style.css */

/* Výchozí stav – menu skryto */
ul.dropdown, ul.dropdown-submenu {
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;
}

/* Přesunutí submenu vpravo od rodičovské položky */
ul.dropdown-submenu {
    top: 0;
    left: 100%;
    transform: translateX(15px);  /* mírně odsazeno pro animaci */
}

/* Zobrazení při hoveru – bez JavaScriptu */
li:hover > ul.dropdown {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
}

li:hover > ul.dropdown-submenu {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
}

/* Aktivní odkaz – červená linka rostoucí ze středu */
a:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 2px;
    width: 0;
    background: #f80000;
    transition: width 0.3s ease, left 0.3s ease;
}
a:hover:after {
    width: 100%;
    left: 0;
}
```

---

### 3. JavaScript – přepínač pater mapy

**Teoretický popis:**
Každá mapa může mít více pater (ground, floor1, floor2, underground). Namísto vytváření samostatných stránek pro každé patro jsme implementovali JavaScriptový přepínač, který mění atribut `src` jednoho `<img>` elementu. Pole `layouts[]` obsahuje cesty k obrázkům a pole `floorNames[]` popisky pater. Kliknutím na tlačítko se cyklicky přechází na další patro pomocí operátoru modulo (`% layouts.length`).

**Code snippet:**
```js
// main/maps/Base Game/23MB/js/script.js

document.addEventListener("DOMContentLoaded", function () {
    const img = document.getElementById("layout-img");
    const btn = document.getElementById("next-layout");
    const floorLabel = document.getElementById("layout-floor");

    if (!img || !btn || !floorLabel) return;

    const layouts = [
        "../../../../../IMG/map/layouts/23_mb_ground.webp",
        "../../../../../IMG/map/layouts/23_mb_floor1.webp",
        "../../../../../IMG/map/layouts/23_mb_floor2.webp",
    ];

    const floorNames = ["Floor 1", "Floor 2", "Floor 3"];
    let currentIndex = 0;

    btn.addEventListener("click", function () {
        // Modulo zajistí cyklický průchod polem
        currentIndex = (currentIndex + 1) % layouts.length;
        img.src = layouts[currentIndex];
        floorLabel.textContent = floorNames[currentIndex];
    });
});
```

Scroll detekce s dynamickými šipkami:

```js
// Šipky se zobrazují/skrývají podle pozice scrollu
window.addEventListener('scroll', () => {
    const inSection2 = window.scrollY >= section2.offsetTop - 50;
    arrowDown.style.opacity = inSection2 ? '0' : '0.7';
    arrowUp.style.opacity   = inSection2 ? '0.7' : '0';
});
```

---

### 4. CSS animace a přechody

**Teoretický popis:**
Stránky zbraní používají CSS keyframe animaci `fadeInUp`, která vytváří dojem plynulého "vynoření" obsahu při načtení stránky. Scrollovací šipky na stránkách map jsou animovány animací `bounce`, která simuluje podskakování. Hover efekty na příslušenství zbraní využívají `transform: translateY(-5px)` a `box-shadow` pro efekt levitace.

**Code snippet:**
```css
/* main/weapons/{Kategorie}/{Zbran}/style.css */

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Celý obsah stránky se animuje při načtení */
.wrapper {
    animation: fadeInUp 0.8s ease-out;
}

/* Hover efekt na obrázku zbraně – zoom */
.img-placeholder img {
    transition: transform 0.5s ease;
}
.img-placeholder:hover img {
    transform: scale(1.03);
}

/* Hover efekt příslušenství – levitace + červená záře */
.attachments-grid img {
    transition: all 0.3s ease;
}
.attachments-grid img:hover {
    border-color: red;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
}
```

```css
/* Skákající šipka na stránkách map */
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(10px); }
}

.scroll-arrow {
    animation: bounce 1.5s ease-in-out infinite;
}
```

---

### 5. Modulární architektura souborů

**Teoretický popis:**
Projekt je záměrně rozdělen do samostatných souborů CSS a JS pro každou sekci, místo jednoho monolitického souboru. Každá mapa má vlastní `style.css` a `script.js` ve složkách `css/` a `js/`. Zbraně mají `style.css` přímo ve své složce. Tato modulárnost umožňuje:
- Snadnou úpravu jedné mapy bez rizika ovlivnění ostatních stránek.
- Načtení pouze těch stylů a skriptů, které konkrétní stránka potřebuje.
- Přehlednou správu projektu při rozrůstání obsahu.

**Code snippet:**
```html
<!-- main/maps/Base Game/23MB/html/index.html -->
<head>
    <!-- Sdílený font přes CDN -->
    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap"
          rel="stylesheet">

    <!-- Lokální CSS specifický pro mapy – relativní cesta ze složky html/ -->
    <link rel="stylesheet" href="../css/style.css">

    <!-- Lokální JS specifický pro tuto mapu – defer zajistí načtení po HTML -->
    <script src="../js/script.js" defer></script>
</head>
```

```
Adresářová logika relativních cest:
  html/index.html → ../css/style.css    (sourozenecká složka css/)
  html/index.html → ../js/script.js     (sourozenecká složka js/)
  html/index.html → ../../../../../IMG/ (5 úrovní nahoru na kořen projektu)
```

---

### 6. SEO optimalizace (sitemap.xml, robots.txt, meta tagy)

**Teoretický popis:**
SEO (Search Engine Optimization) jsou techniky, které pomáhají vyhledávačům (Google, Bing) správně indexovat obsah webu. Klíčové prvky:
- **`sitemap.xml`** – XML soubor se seznamem všech URL stránek webu. Vyhledávač jej používá k efektivnímu procházení webu. Každá URL má prioritu (`priority`) a frekvenci změn (`changefreq`).
- **`robots.txt`** – Textový soubor s instrukcemi pro web crawlery. Říká, které části webu mohou nebo nemohou indexovat, a odkazuje na sitemap.
- **Meta tagy** – Metadata v hlavičce HTML stránky popisují obsah pro vyhledávače a sociální sítě.

**Code snippet:**
```xml
<!-- sitemap.xml – zkrácená ukázka -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Hlavní stránka má nejvyšší prioritu -->
  <url>
    <loc>https://neroje21.github.io/READY-OR-NOT-web/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Stránky map mají prioritu 0.8 -->
  <url>
    <loc>https://neroje21.github.io/READY-OR-NOT-web/main/maps/Base%20Game/23MB/html/index.html</loc>
    <priority>0.8</priority>
  </url>

  <!-- Stránky zbraní mají prioritu 0.6 -->
  <url>
    <loc>https://neroje21.github.io/READY-OR-NOT-web/main/weapons/Assault_Rifle/ARWC/index.html</loc>
    <priority>0.6</priority>
  </url>

</urlset>
```

```
# robots.txt
User-agent: *       ← Platí pro všechny crawlery
Allow: /            ← Povolí indexaci celého webu

Sitemap: https://neroje21.github.io/READY-OR-NOT-web/sitemap.xml
```

```html
<!-- Meta tagy v <head> každé stránky -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ready or Not – Guide</title>
```

---

## AI Deník

Přehled klíčových promptů použitých při tvorbě projektu a přínos AI asistenta.

| # | Prompt | Co AI přinesla |
|---|---|---|
| 1 | *„Correct file paths to all links and img in all the files"* | AI zmapovala celou strukturu projektu (70 stránek), identifikovala chybné relativní cesty a systematicky opravila všechny `href` a `src` atributy – přidala chybějící `main/` prefix u map, `html/` subfolder u ARN180 a opravila nekonzistentní hloubku (`../../../` → `../../../../../`). |
| 2 | *„Correct IMG paths in all html files"* | AI zjistila, že thumbnaily a layouty map jsou uloženy ve složce `IMG/map/thumbnails/` resp. `IMG/map/layouts/`, zatímco HTML soubory odkazovaly na `IMG/thumbnails/` (chyběla úroveň `map/`). Pomocí PowerShell hromadně opravila všechny HTML i JS soubory (36 souborů). |
| 3 | *„Make site map, robots.txt and readme documentation"* | AI vygenerovala kompletní `sitemap.xml` se všemi 70 stránkami (správně URL-enkódované mezery a speciální znaky), `robots.txt` s odkazem na sitemap a vyčerpávající README dokumentaci v češtině. |
| 4 | *„Correct them also in weapons"* | AI identifikovala, že složka `IMG/weapon/` v projektu neexistuje, a místo slepého přepisu cest upozornila na chybějící zdrojové soubory a položila upřesňující otázku. |

**Celkový přínos AI:**
- Automatizace opakujících se oprav (bulk find & replace přes PowerShell)
- Detekce nekonzistencí v relativních cestách napříč desítkami souborů
- Generování strukturovaných XML a Markdown souborů
- Audit adresářové struktury a porovnání s referencemi v kódu

---

## Instalace a spuštění

### Požadavky
- [Visual Studio Code](https://code.visualstudio.com/) s rozšířením **Live Server** (Ritwick Dey)
- Nebo libovolný jiný lokální webový server (Python, Node.js http-server, ...)

### Kroky

1. **Klonování repozitáře**
   ```bash
   git clone https://github.com/Neroje21/READY-OR-NOT-web.git
   cd READY-OR-NOT-web
   ```

2. **Otevření ve VS Code**
   ```bash
   code .
   ```

3. **Spuštění Live Server**
   - Klikněte pravým tlačítkem na soubor `index.html`
   - Zvolte **"Open with Live Server"**
   - Web se automaticky otevře na adrese `http://127.0.0.1:5500/`

4. **Alternativa – Python server**
   ```bash
   python -m http.server 5500
   # Poté otevřete http://localhost:5500
   ```

> **Důležité:** Stránka musí být spuštěna přes HTTP server, nikoli přímým otevřením souboru (`file://`), aby relativní cesty k obrázkům a skriptům fungovaly správně.

### Přidání vlastní mapy
1. Zkopírujte libovolnou existující složku mapy (např. `main/maps/Base Game/23MB/`)
2. Přejmenujte ji a upravte obsah v `html/index.html` a `js/script.js`
3. Přidejte odkaz do navigace v kořenovém `index.html`
4. Přidejte novou URL do `sitemap.xml`

---

## Galerie

### Hlavní stránka – Desktop
<img width="2555" height="1328" alt="main1" src="https://github.com/user-attachments/assets/15c91568-face-4543-b123-febe4e904fab" />
> *Screenshot hero sekce s velkou typografií a červenou linkou pod titulkem "GUIDE"

```
[ Desktop screenshot – index.html ]
Rozlišení: 1920×1080
Prvky: sticky navigace s dropdown menu, hero titulek "READY OR NOT / GUIDE",
       červená dekorativní linka, patička se sociálními sítěmi
```

### Hlavní stránka – Mobil
<img width="461" height="957" alt="mobile png" src="https://github.com/user-attachments/assets/658e89f5-8eb9-4db3-922d-11dbb1c02c00" />
> *Screenshot mobilního zobrazení s komprimovanou navigací*

```
[ Mobile screenshot – index.html ]
Rozlišení: 390×844 (iPhone 14)
Prvky: zmenšená navigace (font 0.65rem), hero titulek 2.5rem,
       patička ve sloupcovém layoutu
```

### Stránka mapy – Desktop
<img width="3705" height="2154" alt="map png" src="https://github.com/user-attachments/assets/2f662f30-b359-4b74-9667-2a08f1435e10" />
> *Screenshot mise s thumbnailem, tabulkami cílů*

```
´[ Desktop screenshot – 23MB/html/index.html ]
Prvky: back-btn (←), titulek mise, popis, tabulky Hard/Soft Objectives,
       počty Suspects/Civilians, obtížnost, thumbnail vpravo,
       scrollovací šipka (↓)
```

### Stránka mapy – Přepínač pater
<img width="3837" height="2397" alt="layout" src="https://github.com/user-attachments/assets/68acdde7-0e1e-4a62-be2f-3b0f3dc28f20" />
> *Screenshot sekce "Map Layout" s půdorysem a tlačítkem →*

```
[ Desktop screenshot – layout sekce ]
Prvky: popisek "Floor 1 / Floor 2 / Floor 3", obrázek půdorysu,
       tlačítko → pro přepnutí patra, back-btn (←) šipka cukne doleva při hoveru
```

### Stránka zbraně – Desktop
<img width="3837" height="2397" alt="AWRC" src="https://github.com/user-attachments/assets/d01e7ed9-0849-44b3-ba31-f2d8e2140771" />
> *Screenshot ARN s fotografií zbraně a doporučeným loadoutem*

```
[ Desktop screenshot – weapons/Assault_Rifle/ARWC/index.html ]
Prvky: titulek "ARWC" s červenou podtržítko linkou, popis zbraně,
       tabulka statistik (caliber / RPM / Recoil / Capacity),
       fotografie zbraně (55% šířky), sekce "Recommended loadout"
       s ikonami příslušenství (optic, muzzle, grip, other)
```

### Dropdown navigace
<img width="2554" height="1290" alt="drop down menu" src="https://github.com/user-attachments/assets/a7428e7a-2245-4e4e-adf8-499fa1a640a5" />
> *Screenshot otevřeného víceúrovňového menu*

```
[ Screenshot navigace ]
Prvky: hover na "Maps" → otevře dropdown "Base Game" →
       hover na "Base Game" → otevře submenu se všemi 18 mapami,
       glassmorphism efekt (backdrop-filter: blur), červený hover highlight
```
