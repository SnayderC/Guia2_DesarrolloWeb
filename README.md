# NexusAuth · Landing Page con React y Bootstrap

Práctica 2 de la asignatura **Desarrollo Web** (Ingeniería de Software, UNEMI).

Landing page de **NexusAuth**, un servicio ficticio de gestión de accesos para empresas.
Integra el formulario de inicio de sesión de la **Guía 1** (hecho con HTML, CSS y JavaScript puro),
migrado a React con estados, eventos y validaciones.

> ⚠️ **La autenticación es simulada.** No hay backend ni base de datos: el formulario solo valida
> los datos en el navegador y muestra un mensaje de éxito. No se guardan contraseñas ni datos personales.

## Tecnologías

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Componentes funcionales, JSX, `useState`, `useRef`, `useEffect` |
| [Vite](https://vite.dev/) | Servidor de desarrollo y build de producción |
| [Bootstrap 5](https://getbootstrap.com/) | Grid, navbar, cards, formularios, alertas y diseño responsivo |
| [oxlint](https://oxc.rs/) | Linter incluido en la plantilla de Vite |
| [Font Awesome 6](https://fontawesome.com/) y Google Fonts | Iconos y tipografías (por CDN, igual que en la Guía 1) |

## Funcionalidades

Se migró **toda** la Guía 1 (login, registro y recuperación) a React + Bootstrap, conservando
sus reglas, mensajes y comportamientos.

- **Landing**: Navbar responsivo (menú controlado con `useState`, sin el JavaScript de Bootstrap),
  Hero, Servicios, Portal de acceso y Footer, con el tema oscuro de la Guía 1.
- **Portal de acceso** con panel informativo, pestañas *Iniciar sesión* / *Crear cuenta* y cabecera
  (icono, título y subtítulo) que cambia según la vista.
- **Rutas hash** `#/login`, `#/register`, `#/recovery`, compatibles con Atrás / Adelante del navegador.
- **Inicio de sesión**: correo `@gmail.com`, contraseña de 8+ caracteres con letras y números,
  mostrar/ocultar contraseña, "Recordar este dispositivo" (solo visual) y enlace a recuperación.
- **Registro** en dos secciones (*Identidad y contacto*, *Seguridad de la cuenta*):
  - Nombre: solo letras, mínimo 3 caracteres.
  - Edad: número entero entre 18 y 75.
  - Teléfono: `+593` y 9 dígitos, con filtrado en tiempo real de caracteres no válidos.
  - Contraseña con medidor de fortaleza (débil / media / fuerte) y reglas visuales.
  - Confirmación que se revalida al cambiar la contraseña.
  - Tras crear la cuenta, vuelve al login a los 1,2 s.
- **Recuperación de contraseña**: valida el correo y vuelve al login a los 1,8 s.
- **Validaciones**: al salir del campo (`onBlur`) y al enviar (`onSubmit`); el error desaparece al
  escribir un valor correcto; errores con `is-invalid` / `invalid-feedback` y `aria-invalid`;
  foco automático en el primer campo con error.
- **Notificaciones (toasts de Bootstrap)** de error y éxito: se cierran solas, se pausan con el
  mouse encima y tienen botón de cierre.
- **Accesibilidad**: enlace para saltar al formulario, labels en todos los campos, navegación por
  teclado, roles ARIA y respeto de `prefers-reduced-motion`.

### Mejoras respecto a la Guía 1

- Validaciones como funciones puras en `src/utils/validaciones.js` y lógica de formularios
  reutilizable en el hook `useFormulario` (antes repetida para cada formulario).
- Sin manipulación directa del DOM (`getElementById`, `innerHTML`, `classList`): todo es estado + JSX.
  JSX escapa el texto automáticamente, así que ya no hace falta la función `escapeHTML`
  (que además escapaba dos veces el correo en el mensaje de éxito).
- `trim()` en nombre, correo y edad al salir del campo; la contraseña no se recorta.
- La edad solo acepta enteros (antes `"25.9"` se aceptaba como 25).
- Botón deshabilitado con spinner durante el envío simulado, para evitar envíos duplicados.
- Toasts corregidos: antes, pasar el mouse varias veces acumulaba temporizadores de cierre.
- Nombre de cada nivel de fortaleza y barra de progreso accesible.

## Estructura

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Servicios.jsx
│   ├── Acceso.jsx              # portal: pestañas, cabecera y vista activa
│   ├── PanelInformativo.jsx    # panel lateral de la Guía 1
│   ├── LoginForm.jsx
│   ├── RegistroForm.jsx
│   ├── RecuperacionForm.jsx
│   ├── Campo.jsx               # input con icono, pista, error y mostrar/ocultar
│   ├── FortalezaPassword.jsx
│   ├── Notificaciones.jsx      # toasts
│   └── Footer.jsx
├── hooks/
│   ├── useFormulario.js        # estado, eventos y validación de formularios
│   ├── useVistaHash.js         # vista activa sincronizada con la URL
│   └── useNotificaciones.js
├── utils/
│   └── validaciones.js         # funciones puras de validación
├── App.jsx
├── main.jsx
└── index.css                   # tema oscuro sobre las variables de Bootstrap
legacy/guia1/                   # código original de la Guía 1 (solo referencia)
```

## Instalación y ejecución

Requisitos: [Node.js](https://nodejs.org/) 20 o superior.

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run lint       # revisar el código
npm run build      # build de producción
npm run preview    # probar el build
```

## Integrantes

| Nombre | Usuario de GitHub |
|---|---|
| Snayder Cedeño | SnayderC |
| Julissa Lescano | Julissa Lescano |
| Dayanara Guerrero | GuerreroDayanara |
| Veronia Pin | VeronicaSuarez23 |
| Javier Quinteros | Javier Quinteros |




