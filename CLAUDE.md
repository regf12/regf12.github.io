# Guía de Desarrollo del Proyecto (CLAUDE.md)

Este documento contiene directrices rápidas para el desarrollo del portafolio.

## Comandos Útiles

- **Instalar Dependencias**: `npm install`
- **Compilar y Ejecutar en Desarrollo**: `npm run dev` o `gulp` (según configuración de gulpfile.js)
- **Minificar y Preparar Recursos**: `gulp` o procesos de compilación internos

## Guía de Estilos y Buenas Prácticas

- **Idiomas**: Soporte multilingüe en `locale/es.js`, `locale/es.json` (español) y `locale/en.js`, `locale/en.json` (inglés).
- **Traducciones**: Cualquier cambio de texto debe hacerse en los diccionarios `.js` y `.json`. La lógica en `js/resume.js` maneja la persistencia y carga local sin CORS.
- **Responsive**: Seguir el sistema de rejilla y utilidades responsivas de Bootstrap.
