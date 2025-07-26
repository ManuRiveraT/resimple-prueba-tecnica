# 🧪 Prueba Técnica - Desarrollador Junior ReSimple

Este proyecto fue desarrollado como respuesta a la prueba técnica para el cargo de Desarrollador Junior en ReSimple.

## 📌 Descripción

La aplicación permite:

- Leer un archivo Excel (`origen-datos-junior.xlsx`) simulando una base de datos.
- Cruzar los datos con un diccionario JSON (`diccionario-de-datos.json`) para obtener nombres reales y sueldos.
- Mostrar la información en una tabla con:
  - Paginación
  - Filtros por nombre/RUT, empresa, área y rango de sueldo
  - Exportación a Excel (`.xlsx`)
- Cálculo y despliegue de KPIs:
  - Gasto mensual por empresa y área
  - Cantidad de trabajadores por empresa y área
- Visualización de KPIs con gráficos usando `Chart.js` (opcional)

---
## 📁 Estructura del proyecto

📂 proyecto/
├── index.html
├── assets/
│ ├── origen-datos-junior.xlsx
│ └── diccionario-de-datos.json
├── css/
│ └── styles.css
├── js/
│ ├── main.js
│ ├── dataLoader.js
│ ├── filters.js
│ ├── table.js
│ ├── kpis.js
│ ├── export.js
│ └── utils.js
├── lib/
  └── xlsx.full.min.js
---

## 🚀 Cómo ejecutar el proyecto

### ✅ Requisitos

- Un navegador moderno (Chrome, Firefox, Edge).
- Servidor local para evitar problemas de seguridad con archivos locales (por ejemplo: `fetch()` de archivos `.json` o `.xlsx`).

### 🔄 Opciones para ejecutar localmente

#### Opción 1: Usar Live Server (VSCode)

1. Instala la extensión “Live Server” en Visual Studio Code.
2. Haz clic derecho sobre `index.html` y selecciona “**Open with Live Server**”.

#### Opción 2: Usar servidor Python (si no tienes VSCode)

Desde la terminal, en la carpeta del proyecto:

```bash
# Python 3
python -m http.server
