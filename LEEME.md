# Vertical: web coming soon

Web estática (HTML + CSS + JS, sin dependencias). Para publicarla, sube **todo el contenido de esta carpeta** a la raíz del hosting. La página de entrada es `index.html`.

```
index.html
css/styles.css      estilos (colores, medidas y breakpoints arriba del todo, en :root)
js/content.js       TODOS los textos EN/ES, enlaces y listas de talentos (edita aquí)
js/main.js          interacciones
assets/img/         logo (SVG) y fotos de los fundadores
assets/fonts/       tipografía ABC Diatype Medium (woff2 + woff)
```

## Interacciones (sacadas del prototipo de Figma)
- **Hover en Athletes / Creators / Artists**: esa palabra se queda en negro y el resto de la frase pasa a gris.
- **Clic en una categoría**: el número cambia a (X) y las fotos y el texto de fundadores se sustituyen por la lista de talentos. Clic otra vez en la misma, tecla Esc o clic en el logo: vuelve al inicio.
- **Hover en una foto o en el nombre de un fundador**: las otras fotos bajan al 20 % de opacidad y el texto pasa a gris salvo ese nombre. Clic: abre su perfil.
- **Hover en un nombre de la lista**: pasa a gris. **Hover en contacto**: pasa a negro.
- **EN / ES** en el pie: cambio de idioma con un clic (se recuerda; también vale `?lang=es` en la URL).
- En móvil los números son (01)…(06) y en escritorio (1)…(6), igual que en Figma.
- En pantallas táctiles el toque aplica el mismo resaltado que el hover. Con teclado, el foco hace lo mismo.

## Lo que no he podido sacar de Figma
1. **Fotos en alta resolución.** El conector de Figma llegó a su límite de llamadas (plan de vista) antes de exportarlas a 2x/3x, así que las tres fotos están a 1x (109 × 151 px) y se verán algo blandas en pantallas retina. Exporta en Figma las capas `image 15`, `image 16` e `image 14` (página "Design — Feedback") a PNG o JPG 3x y sustituye, con el mismo nombre:
   - `assets/img/marc-marquez.png` (image 15)
   - `assets/img/jaime-martinez-recasens.png` (image 16)
   - `assets/img/alex-marquez.png` (image 14)
2. **Tipografía:** ya se usa la del diseño, **ABC Diatype Medium** (Dinamo), en `assets/fonts/` (woff2 y woff). Es de pago: asegúrate de que la licencia cubre el uso web en este dominio.

## Suposiciones
- **Años**: en el frame de escritorio pone "© 226" y "en 222"; en móvil pone 2026 y 2022. He usado **2026 y 2022** en las dos versiones.
- **Hover de Instagram / email / LinkedIn**: el componente de Figma está pensado para fondo oscuro (pasa a blanco, que no se vería). He usado negro, igual que el hover de la dirección.
- **Textos en español que no estaban en Figma** (traducidos por mí): "Web en desarrollo" y "© 2026 Vertical Group. Todos los derechos reservados.". "Building Global Icons" se mantiene en inglés porque así aparece en el copy en español. Las palabras de categoría en español son "deportistas", "creadores" y "artistas".
- La URL de LinkedIn de la empresa y las de Instagram de los artistas las he limpiado de parámetros (`?originalSubdomain=es`, `?hl=es`).
- Idioma por defecto: inglés (como en el diseño).
- Transiciones: fundido de 200 ms (ease-out), el que usa el prototipo.

## Lo que tienes que revisar o completar
- Sustituir las 3 fotos por versiones 3x (ver arriba).
- Revisar las traducciones al español y confirmar los años.
- Accesibilidad: los grises del diseño (#9f9f9f sobre blanco) no llegan al contraste mínimo AA (2,6:1). Los he respetado para ser fieles al diseño. Si queréis cumplir AA, cambia `--c-muted` en `css/styles.css` a `#767676`.
- Opcional: favicon propio (ahora usa el logo SVG) e imagen para compartir en redes (Open Graph).

## Ajuste a pantalla (sin scroll)
Solo en escritorio: la página siempre ocupa una pantalla y los espacios verticales entre bloques se encogen con la altura de la ventana. En móvil se mantienen las medidas de Figma y se puede hacer scroll. Se ajusta en `css/styles.css`, dentro de `:root`, con las variables `--gap`, `--logo-top`, `--footer-bottom` y `--page-pad`. En `clamp(mínimo, fórmula, máximo)` el primer número es el espacio mínimo: si lo bajas, cabe en pantallas más bajas.

## Comprobado
- Escritorio 1440 × 1024 y móvil 430 × 932: posiciones medidas en navegador iguales a Figma (±1 px).
- Sin desbordes horizontales en 320, 600, 768 y 1024 px de ancho.
- Sin scroll vertical desde 1280 × 650 hasta 1920 × 1080 en escritorio, (en móvil sí hay scroll si la pantalla es más baja que el diseño).
- Probados hover, clics de categorías, vuelta al inicio, enlaces, toque en móvil, teclado (Tab/Enter/Esc) y EN/ES. Sin errores en consola.

## Al actualizar la web
Si cambias css/styles.css o algún archivo de js/, cambia también el número `?v=` de esos archivos en index.html (por ejemplo, pon la fecha del día). Así los navegadores descargan la versión nueva en lugar de usar la guardada en caché.
