import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <LoginForm />
      </main>
      <Footer />
    </>
  )
}

export default App
