# Portfolio de Matías D'Agostino

Sitio estático publicado en https://matiasdagostino.me (Vercel, se despliega solo al hacer push a `main`).

## Cómo editar

- El contenido, los estilos y los textos en español e inglés están en `source/page.html`.
- `python3 build.py` genera `index.html` a partir de ese archivo.
- Las imágenes y videos están en `public/media/`.
- `npm run build` (Vite) copia todo a `dist/`, que es lo que sirve Vercel.

## Formulario de contacto

El botón "Enviar mensaje" usa FormSubmit y llega a mi email. El botón "Enviar por WhatsApp" abre WhatsApp con el mensaje armado.
