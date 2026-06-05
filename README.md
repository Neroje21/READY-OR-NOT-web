# Ready or Not - Guide 

## Úvod
**Ready or Not - Guide** je interaktivní webový průvodce pro taktickou střílečku *Ready or Not*. Projekt poskytuje detailní informace o herních mapách, včetně jejich cílů, obtížnosti a taktických nákresů. Cílem je poskytnout hráčům přehledný a esteticky zpracovaný nástroj pro plánování misí.

*   **Téma:** Herní průvodce / Databáze map
*   **Živý web:** [Odkaz na GitHub Pages](https://neroje21.github.io/READY-OR-NOT-web/
))

---

## Použité technologie
Při vývoji byly použity moderní webové standardy pro zajištění rychlosti a kompatibility:
*   **HTML5:** Sémantická struktura dokumentů.
*   **CSS3:** Vlastní designový systém využívající Flexbox a Backdrop-filter.
*   **JavaScript (ES6+):** Dynamické přepínání obsahu a interaktivita.
*   **IDE:** Visual Studio Code (Verze 1.90.0) s rozšířením Live Server.

---

## Adresářová struktura
Projekt využívá modulární strukturu pro snadnou údržbu a škálovatelnost. Po nedávné reorganizaci jsou assety pro jednotlivé mapy logicky rozděleny:

```text
/ready or not - guide
├── documentation/          # Projektová dokumentace (tento soubor)
├── IMG/                    # Globální assety (loga, pozadí)
├── main/                   # Hlavní stránky webu
├── maps/                   # Sekce map
│   └── Base Game/          # Základní herní mapy
│       └── [Název mapy]/   # Konkrétní mise (např. 23MB)
│           ├── html/       # index.html konkrétní mapy
│           ├── css/        # style.css konkrétní mapy
│           └── js/         # script.js konkrétní mapy
├── index.html              # Rozcestník projektu
└── style.css               # Globální stylování
```

---

## Technický rozbor

### 1. SEO a Sémantika
**Teoretický popis:** Správné použití sémantických HTML tagů (header, section, table) zajišťuje lepší čitelnost pro vyhledávače a pomocné technologie.
```html
<section id="mission-info" class="section">
    <h1 class="map-title">23 Megabytes a Second / San Uriel Condominiums</h1>
</section>
```
*Využili jsme hierarchii nadpisů a sémantické sekce pro logické rozdělení obsahu.*

### 2. Optimalizace výkonu (Obrázky)
**Teoretický popis:** Používání moderních formátů jako WebP a rozdělení na miniatury (thumbnails) a plné náhledy (layouts) snižuje datovou náročnost.
```html
<img src="../../../../IMG/thumbnails/23_mb_preview.webp" alt="thumbnail">
```
*Všechny velké assety byly převedeny do formátu .webp s vysokou kompresí bez viditelné ztráty kvality.*

### 3. Responzivní Design
**Teoretický popis:** Použití Viewport metatagu a relativních jednotek (rem, vh, %) zajišťuje, že web funguje na různých zařízeních.
```css
@media screen and (max-height: 300px) {
    ul { margin-top: 40px; }
}
```
*Layout využívá flexbox pro automatické zarovnání prvků na různých šířkách obrazovky.*

### 4. Přístupnost (Accessibility)
**Teoretický popis:** Každý interaktivní a vizuální prvek musí mít textový popis pro uživatele se znevýhodněním.
```html
<img id="layout-img" src="..." alt="Layout mapy podlaží 1">
```
*Atributy `alt` jsou vyplněny u všech obrázků a tlačítka mají jasné popisky.*

### 5. Organizace kódu (Separation of Concerns)
**Teoretický popis:** Rozdělení kódu do složek `html`, `css` a `js` v každé mapové složce zvyšuje přehlednost a zabraňuje konfliktům.
*Změna struktury umožnila izolovat styly konkrétních misí od globálního CSS.*

### 6. Interaktivita (JavaScript DOM Manipulation)
**Teoretický popis:** JavaScript slouží k dynamickému přepínání mezi podlažími map bez nutnosti znovunačtení stránky.
```javascript
const nextBtn = document.getElementById('next-layout');
nextBtn.addEventListener('click', () => {
});
```
*Tento přístup výrazně zlepšuje UX (User Experience).*

---

## AI Deník
Projekt byl vyvíjen za asistence AI (Antigravity), která pomohla s těmito klíčovými úkoly:

*   **Zajímavé prompty:**
    1. *"Udělej v každé mapové složce (např: 23MB) 3 složky (html, css, js) a roztřiď tam soubory."*
    2. *"Přidej tabulku s tabulkou obtížnosti do sekce 1 v index.html."*
    3. *"Vytvoř navigaci, která bude mít odkazy na Mapy a Zbraně s hover efektem."*

*   **Přínos AI:** AI se postarala o masivní refaktoring (hromadný přesun souborů ve 18 složkách najednou) a opravu relativních cest v HTML, což ušetřilo hodiny manuální práce.

---

## Instalace a spuštění
1.  Nainstalujte si **Visual Studio Code**.
2.  Nainstalujte rozšíření **Live Server**.
3.  Otevřete složku projektu v VS Code.
4.  Klikněte pravým tlačítkem na `index.html` v kořenovém adresáři a zvolte **Open with Live Server**.
5.  Web se automaticky otevře ve vašem výchozím prohlížeči na adrese `http://127.0.0.1:5500`.

---

## Galerie

| Desktopová verze | Mobilní verze |
| :--- | :--- |
| ![Desktop View](path/to/desktop_screenshot.png) | ![Mobile View](path/to/mobile_screenshot.png) |

*(Poznámka: Screenshoty doplňte do složky documentation/assets/)*
