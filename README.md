# NexusAuth · Landing Page con React y Bootstrap

Práctica 2 de la asignatura **Desarrollo Web** (Ingeniería de Software, UNEMI).

Landing page de **NexusAuth**, un servicio ficticio de gestión de identidad y accesos para empresas.
Integra el **portal de acceso de la Guía 1** (inicio de sesión, registro y recuperación de contraseña),
que estaba hecho con HTML, CSS y JavaScript puro, migrado completo a **React** y **Bootstrap**
con componentes, estados, eventos y validaciones.

> ⚠️ **La autenticación es simulada.** No hay backend ni base de datos: los formularios validan los
> datos en el navegador y muestran un mensaje de éxito. No se envían ni se guardan contraseñas ni
> datos personales (nada en `localStorage`, `sessionStorage` ni cookies).

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 19 | Componentes funcionales, JSX, `useState`, `useEffect`, `useRef` y hooks propios |
| [Vite](https://vite.dev/) | 8 | Servidor de desarrollo y build de producción |
| [Bootstrap](https://getbootstrap.com/) | 5.3 | Grid, navbar, cards, nav-pills, formularios, validación, progress, toasts y modo oscuro |
| [oxlint](https://oxc.rs/) | 1 | Linter incluido en la plantilla de Vite |
| [Font Awesome](https://fontawesome.com/) | 6.5 (CDN) | Iconos, igual que en la Guía 1 |
| [Google Fonts](https://fonts.google.com/) | CDN | Tipografías Inter, Plus Jakarta Sans y JetBrains Mono |

## Cumplimiento de la guía

| Sesión | Requisito | Dónde se cumple |
|---|---|---|
| 1 · React | Proyecto organizado en componentes funcionales con JSX | `src/components/` (un componente por archivo) |
| 1 · React | Integrar el formulario de la Guía 1 en la landing | `Acceso.jsx` con `LoginForm`, `RegistroForm` y `RecuperacionForm` |
| 2 · Bootstrap | Instalar e integrar Bootstrap | `npm install bootstrap`, importado en `src/main.jsx` |
| 2 · Bootstrap | Componentes y clases de Bootstrap | Navbar, grid, cards, nav-pills, input-group, form-control, progress, badges, toasts |
| 2 · Bootstrap | Diseño responsivo | Grid `col-12 / col-md-* / col-lg-*`; probado en móvil, tablet y escritorio |
| 3 · Estados | `useState` para los datos del formulario | Hook `useFormulario` (un objeto para datos y otro para errores) |
| 3 · Estados | Eventos de cambio y envío | `onChange`, `onBlur`, `onSubmit` con `e.preventDefault()` |
| 3 · Estados | Mantener y mejorar las validaciones | `src/utils/validaciones.js` (ver [mejoras](#mejoras-respecto-a-la-guía-1)) |
| 3 · Estados | Mensajes dinámicos de error y éxito | Errores por campo y toasts de error / éxito |

## Funcionalidades

### Landing

- **Navbar** fijo y responsivo. En móvil, el menú ☰ se abre y cierra con `useState`, sin el JavaScript de Bootstrap.
- **Hero** con llamadas a la acción que abren directamente el registro o el inicio de sesión.
- **Servicios** en tarjetas: 1 columna en móvil, 2 en tablet y 4 en escritorio.
- **Portal de acceso** y **Footer**, con el tema oscuro de la Guía 1.

### Portal de acceso (migrado de la Guía 1)

- **Panel informativo** con logo, estado del sistema, gráfico de red, características y fila de cumplimiento.
  Se muestra en escritorio y se oculta en pantallas pequeñas, como en la Guía 1.
- **Pestañas** *Iniciar sesión* / *Crear cuenta* y **cabecera dinámica** (icono, título y subtítulo según la vista).
- **Rutas** `#/login`, `#/register` y `#/recovery`, compatibles con los botones Atrás / Adelante del navegador.
- **Notificaciones (toasts)** de error y de éxito: se cierran solas a los 4 s, se pausan con el mouse
  encima y tienen botón de cierre.

### Formularios y validaciones

| Formulario | Campo | Regla |
|---|---|---|
| Login | Correo | Obligatorio, dominio `@gmail.com` |
| Login | Contraseña | Obligatoria, mínimo 8 caracteres con letras y números |
| Registro | Nombres completos | Obligatorio, solo letras (con tildes y ñ), mínimo 3 caracteres |
| Registro | Correo | Obligatorio, dominio `@gmail.com` |
| Registro | Edad | Obligatoria, número entero entre 18 y 75 |
| Registro | Teléfono | Obligatorio, `+593` seguido de 9 dígitos; se filtran letras y símbolos al escribir |
| Registro | Contraseña | Obligatoria, mínimo 8 caracteres con letras y números; medidor de fortaleza |
| Registro | Confirmar contraseña | Obligatoria, debe coincidir; se revalida al cambiar la contraseña |
| Recuperación | Correo | Obligatorio, dominio `@gmail.com` |

Comportamiento común a los tres formularios:

- Valida al **salir del campo** y al **enviar**. Un campo vacío solo se marca si ya se intentó enviar.
- El error **desaparece al escribir** un valor correcto.
- Campos con borde rojo o verde (`is-invalid` / `is-valid`), mensaje bajo el campo y `aria-invalid`.
- Al enviar con errores: toast de error y **foco en el primer campo** incorrecto.
- Al enviar correctamente: spinner, toast de éxito y formulario limpio. El registro vuelve al login
  a los 1,2 s y la recuperación a los 1,8 s.
- Botón para **mostrar / ocultar** las contraseñas.

### Mejoras respecto a la Guía 1

- **Sin manipulación directa del DOM** (`getElementById`, `innerHTML`, `classList`, `addEventListener`
  sobre elementos): todo es estado + JSX.
- **Validaciones como funciones puras** en `src/utils/validaciones.js`, y lógica de formularios
  reutilizable en el hook `useFormulario` (en la Guía 1 se repetía en cada formulario).
- **Protección XSS por defecto**: JSX escapa el texto, así que ya no hace falta `escapeHTML`
  (que además escapaba dos veces el correo en el mensaje de éxito).
- `trim()` en nombre, correo y edad al salir del campo. La contraseña no se recorta, porque los
  espacios forman parte de ella.
- La **edad solo acepta enteros** (antes `"25.9"` se aceptaba como 25).
- **Botón deshabilitado con spinner** durante el envío simulado, para evitar envíos duplicados.
- **Toasts corregidos**: antes, pasar el mouse varias veces acumulaba temporizadores de cierre.
- Medidor de fortaleza con **nombre del nivel** (débil / media / fuerte) y barra accesible.

### De la Guía 1 a React

| Guía 1 (JavaScript puro) | React |
|---|---|
| `document.getElementById(...).value` | Inputs controlados (`value` + `onChange`) |
| `classList.add('has-error')` | `className` calculado desde el estado de errores |
| `errorText.textContent = ...` | `{errores.email}` dentro de `invalid-feedback` |
| `formSubmitTracker` | Estado `intentoEnvio` en `useFormulario` |
| `switchView()` + `history.pushState` | Estado `vista` en `useVistaHash` |
| `showToast()` con `createElement` | Estado `notificaciones` + componente `Notificaciones` |
| `input.setAttribute('type', 'text')` | Estado `visible` en `Campo` |
| Barra de fortaleza con `classList` | `FortalezaPassword` calculado a partir del valor |

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
├── App.jsx                     # compone las secciones de la landing
├── main.jsx                    # punto de entrada; importa Bootstrap
└── index.css                   # tema oscuro sobre las variables de Bootstrap
legacy/guia1/                   # código original de la Guía 1 (solo referencia)
```

## Instalación y ejecución

Requisitos: [Node.js](https://nodejs.org/) 20 o superior y conexión a internet (para los iconos y
las tipografías).

```bash
git clone https://github.com/SnayderC/Guia2_DesarrolloWeb.git
cd Guia2_DesarrolloWeb
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo → http://localhost:5173
```

Otros comandos:

```bash
npm run lint       # revisar el código
npm run build      # build de producción (carpeta dist/)
npm run preview    # servir el build → http://localhost:4173
```

## Cómo probar

Datos de ejemplo:

| Caso | Correo | Contraseña |
|---|---|---|
| Válido | `usuario@gmail.com` | `clave1234` |
| Dominio incorrecto | `usuario@hotmail.com` | — |
| Contraseña débil | — | `abcdefgh` |

Registro válido: `José Pérez`, `jose.perez@gmail.com`, edad `30`, teléfono `+593991234567`,
contraseña `clave1234` (y la misma en la confirmación).

1. Pulsa **Acceder al portal** con los campos vacíos: aparece un toast de error, los campos se marcan
   en rojo y el cursor va al correo.
2. Escribe un correo de otro dominio y sal del campo: aparece el error de `@gmail.com`. Corrígelo y
   verás que el error desaparece mientras escribes.
3. Inicia sesión con los datos válidos: spinner, toast de éxito y formulario limpio.
4. En **Crear cuenta**, prueba edad `17`, un teléfono con letras (se filtran solas) y observa el
   medidor de fortaleza mientras escribes la contraseña.
5. En **¿Olvidaste tu contraseña?**, envía un correo válido: toast de éxito y regreso automático al login.
6. Usa los botones Atrás / Adelante del navegador para moverte entre vistas.
7. Con las herramientas de desarrollo (F12 → modo dispositivo), revisa el diseño en móvil y tablet.

## Integrantes

| Nombre | Usuario de GitHub |
|---|---|
| Snayder Cedeño | SnayderC |
| Julissa Lescano | Julissa Lescano |
| Dayanara Guerrero | GuerreroDayanara |
| Veronia Pin | VeronicaSuarez23 |
| Javier Quinteros | Javier Quinteros |
