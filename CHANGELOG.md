# Changelog - Portfolio Rafael Emilio Guzmán

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [Desbloqueado] - 2026-06-05

### Añadido
- Archivo `AGENTS.md` para el seguimiento del estado del agente en el proyecto.
- Archivo `CHANGELOG.md` para el registro histórico de cambios.

### Modificado
- `data-resume.json`: Conversión y migración completa del contenido del portfolio (`rafael-emilio-guzman/index.html`) a formato JSON estructurado.
  - Se añadieron todos los enlaces de contacto y redes sociales (Email, WhatsApp, Telegram, LinkedIn, Workana, GitHub, GitLab) en la sección `about`.
  - Se registraron 51 habilidades técnicas (Programming Languages and Tools), 31 herramientas de desarrollo (Tools) (añadiendo Vercel, GitLab CI/CD, OpenAI API y SSH) y 6 habilidades blandas (Soft Skills) en la sección `skills`.
  - Se migraron los 8 proyectos del portfolio visual a la sección `awards`, vinculando e indexando de forma precisa las `"skills"` tecnológicas empleadas en su desarrollo (añadiendo Flutter, HTML5, CSS3, JavaScript, NPM y Composer según el stack del proyecto).
  - Se estructuraron las 11 experiencias laborales dentro de `experience`, vinculando las `"skills"` aplicadas e integrando habilidades deducidas lógicamente de las descripciones (como PHP/Composer para puestos con Laravel; Node.js/NPM para Vue/React/Angular; iOS/Android para mobile; y Express/Bash/Nginx/Docker/SSH/REST API en sus respectivos contextos, destacando SSH en Saecosof).
  - Se incluyeron los 4 títulos académicos y certificaciones en `education`, solucionando un error de copiado existente en la plantilla original.
