"""Builds index.html (the Vite entry, a complete HTML document) from source/page.html (a fragment).

Run:  python3 build.py
Then: npm run build   (Vite copies public/ into dist/, which is what Vercel serves)
"""
import re
from pathlib import Path

SITE = "https://matiasdagostino.me"
TITLE = "Matías D'Agostino, Desarrollador Full-Stack"
DESC = "Desarrollador Full-Stack de Paraná, Argentina. Creador de Teire, una app gratuita para organizar tu día. APIs, bases de datos e interfaces."

root = Path(__file__).resolve().parent
src = (root / "source" / "page.html").read_text(encoding="utf-8")
head, body = src.split("<!--/head-->", 1)

# Real title for search engines and tabs (the page script keeps it in sync with the language).
head = re.sub(r"<title>.*?</title>", f"<title>{TITLE}</title>", head, count=1, flags=re.S)
head = re.sub(r'<meta name="description"[^>]*>\n?', "", head, count=1)

extra = f"""<meta name="description" content="{DESC}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="canonical" href="{SITE}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Matías D'Agostino">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:url" content="{SITE}/">
<meta property="og:locale" content="es_AR">
<meta property="og:image" content="{SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{SITE}/og.png">
"""

# Files in public/ are served from the site root, so the deployed page uses absolute paths.
body = re.sub(r'(src|poster)="media/', r'\1="/media/', body)

html = (
    "<!doctype html>\n"
    '<html lang="es">\n<head>\n'
    '<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
    '<meta name="theme-color" content="#F1F1EE">\n'
    "<style>:root{padding-block:env(safe-area-inset-top,0px) env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}img{max-width:100%}</style>\n"
    + extra
    + head.strip()
    + "\n</head>\n<body>\n"
    + body.strip()
    + "\n</body>\n</html>\n"
)
(root / "index.html").write_text(html, encoding="utf-8")
print("wrote", root / "index.html", len(html), "bytes")
