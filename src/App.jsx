import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Statement from './components/Statement.jsx'
import Services from './components/Services.jsx'
import Swatches from './components/Swatches.jsx'
import Process from './components/Process.jsx'
import BeforeAfter from './components/BeforeAfter.jsx'
import Places from './components/Places.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Services />
        <Swatches />
        <Process />
        <BeforeAfter />
        <Places />
        <Faq />
      </main>
      <Contact />
    </>
  )
}
