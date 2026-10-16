import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Acceso from './components/Acceso'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <a href="#acceso" className="visually-hidden-focusable salto-contenido">
        Saltar al formulario de acceso
      </a>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Acceso />
      </main>
      <Footer />
    </>
  )
}

export default App
