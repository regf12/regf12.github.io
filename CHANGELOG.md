# CHANGELOG

## [Unreleased] - 2026-05-29
### Added
- Configuración de redirección automática desde la raíz del portafolio hacia la subcarpeta `rafael-emilio-guzman/index.html`.
- Ajustes de rutas relativas (`../`) para resolver correctamente la carga de recursos (estilos, imágenes, scripts) desde la subcarpeta.
- Inyección dinámica de `window.assetPrefix` en JavaScript (`js/resume.js` y `js/resume.min.js`) y definición del prefijo en `rafael-emilio-guzman/index.html` para la carga correcta de traducciones JSON y currículum PDF.
- Actualización de `sitemap.xml` para incluir la URL directa de la subcarpeta index.html y actualizar la fecha del índice.
- Optimización y enriquecimiento de las descripciones de la experiencia laboral en `locale/es.json` y `locale/en.json` con terminología avanzada ATS e IA y métricas cuantitativas de impacto.
- Alineación de claves de traducción (`data-key`) en la sección de experiencia de `rafael-emilio-guzman/index.html` para unificar la representación multilingüe de roles.
- Incorporación de un selector de idioma interactivo y minimalista (elemento `<select>`) centrado horizontalmente al final del panel lateral de navegación, con persistencia mediante `localStorage`.
- Ocultación del selector de idioma del menú lateral en pantallas pequeñas/móviles mediante clases responsivas de Bootstrap (`d-none d-lg-flex`), asegurando que solo aparezca el menú móvil colapsable correspondiente.
- Ocultación del selector de idioma móvil (`select-lang-mobile`) en pantallas grandes mediante la clase `d-lg-none` en el elemento de menú (`<li>`).
- Corrección de `js/resume.min.js` reemplazando los selectores `#select-lang` antiguos por el nuevo selector de clase `.select-lang` para sincronizar y restaurar la funcionalidad del cambio de idioma.
- Creación de archivos `locale/es.js` y `locale/en.js` e importación en `rafael-emilio-guzman/index.html` para evadir el bloqueo de CORS cuando el portafolio es abierto localmente mediante el protocolo `file://`.
- Modificación de `js/resume.js` y `js/resume.min.js` para usar las traducciones cargadas directamente en memoria como fallback prioritario antes de recurrir a `fetch()`.
- Corrección de la duplicación de traducciones en la sección principal del Home (`about`), asignando claves diferenciadas (`home.role.fullstack` y `home.role.ai`) en el HTML y en los diccionarios de idiomas (archivos `.js` y `.json`), evitando que ambos divs muestren la misma cadena completa.
- Actualización de los años de experiencia en el perfil profesional de 6 a 8 años en todas las descripciones de inicio (`home.text1`) tanto en español como en inglés, y a lo largo de los diccionarios `.js`, `.json` y archivo `index.html`.
- Traducción completa de los roles profesionales ("Desarrollador Full-Stack" e "Ingeniero de IA de Despliegue Avanzado") y del distintivo del portafolio ("IA Empresarial") en los diccionarios en español (`es.js` y `es.json`).
- Reformulación completa y profesionalización (orientación ATS y enfoque en IA/resultados) del historial laboral de la experiencia para las empresas Kelmia, NEARBY CRM, Xiomex, Acristo Engine, Phercu, Deep Sea Developments, Sim Venezuela y Saecosof, actualizando la estructura de puntos en `rafael-emilio-guzman/index.html` y aplicando las traducciones correspondientes en español e inglés en todos los diccionarios (`.js` y `.json`).

## [Unreleased] - 2026-05-25
### Added
- Creación de archivos `CLAUDE.md` y `CHANGELOG.md` para iniciar el seguimiento del estado del proyecto.
- Reorientación completa del portafolio al perfil de **Forward Deployment AI Engineer** y **Full-Stack Developer**.
- Habilidades de **IA Aplicada y Agentes** (`APPLIED AI & AGENTS`) en la interfaz de usuario con iconos de Python, OpenAI, Anthropic, Gemini, LangChain y Pinecone.
- Proyecto **Enterprise AI Search (RAG System)** con una interfaz visualmente excelente generada por IA.
- Reorientación del bot de Telegram a **AI Agent & Telegram Bot**.
- Optimización SEO mediante meta descriptores optimizados en `index.html`.
- Reescritura del historial laboral en español e inglés en `locale/es.json` y `locale/en.json` bajo formato de logros e impacto ATS/IA.
- Optimización de la estructura HTML de experiencias en `index.html` para consistencia de puntos descriptivos.
