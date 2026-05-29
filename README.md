#  LogBook Control Frontend

¡Hola! Bienvenido al repositorio del Frontend de **LogBook Control**. 
Este proyecto es una aplicación web diseñada para gestionar y controlar el acceso, horarios y bitácoras de uso de laboratorios del Instituto Tecnológico Superior de Huauchinango. Está pensado para ser intuitivo y eficiente, separando las vistas según el rol del usuario.

---

##  Características Principales

- ** Mapa del Laboratorio:** Visualización interactiva del laboratorio para conocer el estado y distribución de los equipos.
- ** Horarios:** Consulta de disponibilidad y horarios asignados para cada laboratorio.
- ** Bitácora (LogBook):** Registro detallado del uso del laboratorio, ideal para llevar un control estricto de las actividades.
- ** Estadísticas:** Panel visual con gráficas para analizar el uso del laboratorio de manera sencilla.
- ** Gestión de Profesores:** Administración del personal docente que hace uso de las instalaciones.
- ** Autenticación y Roles:** Rutas protegidas para `administradores` y usuarios de `bitácora`, asegurando que cada quien vea solo lo que le corresponde.

---

##  Tecnologías Utilizadas

Este proyecto fue construido con herramientas modernas para asegurar un rendimiento óptimo y una gran experiencia de desarrollo:

- **[React 19](https://react.dev/)** - Biblioteca principal para construir la interfaz de usuario.
- **[TypeScript](https://www.typescriptlang.org/)** - Para un código más robusto, seguro y fácil de mantener.
- **[Vite](https://vitejs.dev/)** - Empaquetador extremadamente rápido (adiós tiempos de espera largos).
- **[React Router DOM 7](https://reactrouter.com/)** - Gestión de navegación y protección de rutas.
- **[Axios](https://axios-http.com/)** - Cliente HTTP para la comunicación fluida con nuestra API.
- **[Recharts](https://recharts.org/)** - Para la creación de las hermosas gráficas en el módulo de estadísticas.
- **[Recharts](https://bulma.io/)** - Framework de diseño y layouts predefinidos.
- **CSS Modules** - Estilos encapsulados por componente, para que el CSS no se vuelva un caos.

---

##  Estructura del Proyecto

Aquí te explico cómo está organizado el código para que te sientas como en casa:

```text
src/
 ├── assets/        # Imágenes, íconos y recursos estáticos.
 ├── components/    # Componentes reutilizables (Botones, Modales, Gráficas, inputs).
 ├── models/        # Interfaces y tipos de TypeScript (ej. ITeacher, ISchedule).
 ├── pages/         # Vistas principales de la aplicación (Admin, Login, LogBook, etc.).
 ├── router/        # Configuración de React Router y protección de rutas.
 ├── services/      # Lógica para comunicarse con el backend usando Axios.
 └── App.tsx        # Componente raíz donde se inicializa el enrutador.
```

---

##  Cómo Empezar (Instalación y Uso)

Sigue estos pasos para correr el proyecto en tu máquina local. ¡Es muy fácil!

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd LogBookControl_Frontend
```

### 2. Instalar las dependencias
Asegúrate de tener [Node.js](https://nodejs.org/) instalado. En este proyecto se recomienda usar `pnpm` (porque es muy rápido y tienes el archivo `pnpm-lock.yaml`), pero `npm` también funciona:
```bash
pnpm install
# o si prefieres npm:
npm install
```

### 3. Configurar variables de entorno
Crea un archivo llamado `.env` en la raíz del proyecto. Este archivo le dice al frontend dónde está el servidor backend.
```env
VITE_API_URL=https://api-laboratorio.onrender.com
```

### 4. Iniciar el servidor de desarrollo
¡Hora de ver la magia! Corre el siguiente comando:
```bash
pnpm run dev
# o con npm:
npm run dev
```
El proyecto estará disponible en `Aqui va la url del front`. ¡Ábrelo en tu navegador y disfruta!

---

##  Notas de Contribución

Si vas a hacer cambios en este proyecto, recuerda mantener el tono limpio de los componentes, usar TypeScript para tipar los datos nuevos (puedes crear nuevos archivos en `src/models/` si hace falta) y usar los CSS Modules para los estilos.

