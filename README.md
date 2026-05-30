# UCAB Connect

**Portal de Pasantías — Ingeniería Informática, Universidad Católica Andrés Bello**

UCAB Connect es una plataforma web que conecta a estudiantes de Ingeniería Informática de la UCAB con empresas aliadas que ofrecen oportunidades de pasantías. Permite a los estudiantes explorar y postularse a vacantes, y a las empresas publicar ofertas, gestionar postulantes y enviar notificaciones.

---

## Tecnologías utilizadas

| Capa | Tecnología |
|---|---|
| Frontend | Angular 21 (standalone components) |
| Backend | Node.js + Express 5 |
| Base de datos | JSON plano (`database.json`) |
| Estilos | CSS puro (por componente) |

---

## Estructura del proyecto

```
ucabconnect/
├── Frontend/                         # Aplicación Angular
│   └── src/
│       ├── app/
│       │   ├── Auth/
│       │   │   ├── Login/            # Pantalla de inicio de sesión
│       │   │   ├── RegistroEst/      # Registro de estudiantes
│       │   │   └── RegistroEmp/      # Registro de empresas
│       │   ├── Notificaciones/
│       │   │   ├── Empresa/          # Dashboard principal de empresa
│       │   │   └── Estudiante/       # Dashboard principal de estudiante
│       │   ├── Vacantes/             # Gestión de vacantes (empresa)
│       │   ├── Postulaciones/        # Mis aplicaciones (estudiante)
│       │   └── Perfil/
│       │       └── Estudiante/       # Perfil del estudiante
│       ├── styles.css                # Estilos globales
│       └── index.html                # HTML base
└── Backend/                          # Servidor Express
    ├── src/
    │   ├── Auth/                     # Login y registro
    │   ├── Vacantes/                 # CRUD de vacantes
    │   ├── Notificaciones/           # CRUD de notificaciones
    │   ├── Postulaciones/            # Consulta de postulaciones
    │   ├── Perfil/                   # Consulta de perfil
    │   └── config/                   # Configuración de la BD
    ├── database.json                 # Base de datos en JSON
    └── server.js                     # Punto de entrada del servidor
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [Angular CLI](https://angular.dev/tools/cli) v21

```bash
npm install -g @angular/cli
```

---

##  Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd ucabconnect
```

### 2. Levantar el Backend

```bash
cd Backend
npm install
npm run dev       # Con recarga automática (nodemon)
# o
npm start         # Sin recarga automática
```

El servidor quedará corriendo en: `http://localhost:3000`

### 3. Levantar el Frontend

Abrir una **nueva terminal**:

```bash
cd Frontend
npm install
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

---

## 🔑 Credenciales de prueba

### Estudiante
| Campo | Valor |
|---|---|
| Correo | `lechavero.24@est.ucab.edu.ve` |
| Contraseña | `12345678` |

### Empresa
| Campo | Valor |
|---|---|
| Correo | `net.uno@corp.ve` |
| Contraseña | `12345678` |

### Código de acceso para registro de empresas
```
14122005
```
> Este código es requerido al registrar una nueva empresa. Solo las empresas aliadas con la UCAB lo poseen.

---

## 🌐 Endpoints del API

### Autenticación — `/api/auth`

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/login` | Iniciar sesión (estudiante o empresa) |
| POST | `/api/auth/registro/estudiante` | Registrar nuevo estudiante |
| POST | `/api/auth/registro/empresa` | Registrar nueva empresa |

### Vacantes — `/api/vacantes`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/vacantes/:empresaId` | Obtener vacantes de una empresa |
| POST | `/api/vacantes` | Publicar nueva vacante |
| PUT | `/api/vacantes/:id` | Cerrar una vacante |

### Postulaciones — `/api/postulaciones`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/postulaciones` | Obtener todas las postulaciones |
| POST | `/api/postulaciones` | Crear nueva postulación |

### Notificaciones — `/api/notificaciones`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/notificaciones` | Obtener todas las notificaciones |
| POST | `/api/notificaciones` | Publicar nueva notificación |
| DELETE | `/api/notificaciones/:id` | Eliminar una notificación |
| DELETE | `/api/notificaciones` | Vaciar toda la bandeja |

### Perfil — `/api/perfil`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/perfil?id=<estudianteId>` | Obtener perfil de un estudiante |

### Pasantías (ruta legacy) — `/api/pasantias`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/pasantias` | Obtener todas las vacantes activas (vista estudiante) |

---

## Validaciones del sistema

### Login
- Correo y contraseña son obligatorios
- El tipo de usuario (`estudiante` / `empresa`) debe ser especificado
- Credenciales incorrectas retornan error 401

### Registro de Estudiante
- Todos los campos son obligatorios
- El correo debe ser institucional (`@est.ucab.edu.ve`)
- La contraseña debe tener mínimo 8 caracteres
- Las contraseñas deben coincidir
- No se permiten correos o cédulas duplicadas
- Solo disponible para la sede **Montalbán (Caracas)**

### Registro de Empresa
- Todos los campos son obligatorios
- La contraseña debe tener mínimo 8 caracteres
- Las contraseñas deben coincidir
- Se requiere un **código de acceso** válido proporcionado por la UCAB
- No se permiten correos o RIF duplicados

### Vacantes
- El título y la ubicación son obligatorios para publicar
- Una vacante cerrada no puede volver a abrirse
- Cada empresa solo ve y gestiona sus propias vacantes

### Postulaciones
- Un estudiante no puede postularse dos veces a la misma vacante (el botón desaparece)
- No se puede aplicar a vacantes cerradas

### Notificaciones
- El título y el mensaje son obligatorios
- Las notificaciones se asocian automáticamente a la empresa que las crea (por `empresaId`)

---

## Flujo de uso

### Flujo del Estudiante
1. Ingresar en `localhost:4200` → pantalla de **Login**
2. Seleccionar tab **Estudiante**, ingresar credenciales
3. Acceder al **Dashboard de Estudiante** con 3 secciones:
   - **Explorar Pasantías**: ver y aplicar a vacantes disponibles
   - **Mis Aplicaciones**: tabla con el estado de cada postulación
   - **Mi Perfil**: información académica y personal
4. Icono de **Notificaciones** en el header para ver avisos de empresas
5. **Cerrar sesión** regresa al Login

### Flujo de la Empresa
1. Ingresar en `localhost:4200` → pantalla de **Login**
2. Seleccionar tab **Empresa**, ingresar credenciales
3. Acceder al **Dashboard de Empresa** con 4 secciones:
   - **Mis Ofertas**: listar, publicar y cerrar vacantes
   - **Lista de Postulantes**: *(en desarrollo)*
   - **Notificaciones**: crear y eliminar avisos para estudiantes
   - **Perfil**: *(en desarrollo)*
4. **Cerrar sesión** regresa al Login

---

## Roles del sistema

| Rol | Acceso | Ruta |
|---|---|---|
| **Estudiante** | Explorar vacantes, postularse, ver perfil y notificaciones | `/estudiante` |
| **Empresa** | Publicar/cerrar vacantes, enviar notificaciones | `/empresa` |

---

## Notas técnicas

- La sesión se mantiene en `sessionStorage` del navegador. Al cerrar la pestaña, la sesión se pierde.
- Las contraseñas se almacenan en texto plano en `database.json` (entorno de demostración, no productivo).
- El `database.json` actúa como base de datos en memoria de archivo; cualquier cambio persiste mientras el archivo no sea eliminado.
- El Frontend se comunica con el Backend exclusivamente vía `fetch` a `http://localhost:3000`.

---
