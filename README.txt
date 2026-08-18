PORTACIÓN CR — PROTOTIPO DE LANZAMIENTO

Abrir index.html para probar localmente. Para comportamiento PWA completo, publicar la carpeta en HTTPS (Netlify, Vercel, GitHub Pages, etc.).

Modos de usuario:
- Practicar 180 preguntas
- Examen: 20 preguntas aleatorias
- Resultados, repaso de falladas e historial local

Admin:
- Botón Admin en la cabecera
- En el primer acceso, cualquier clave de 6+ caracteres crea la clave local del dispositivo.
- Permite buscar, editar y exportar el banco.

IMPORTANTE PARA LANZAMIENTO PÚBLICO:
La autenticación actual es deliberadamente local para prototipo. Para usuarios/admin reales y métricas compartidas, conectar un backend (Supabase/Firebase/Auth0 u otro) y no guardar secretos en el frontend.
