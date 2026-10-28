import Nav from './components/Nav.jsx'
import Stage from './components/Stage.jsx'
import Services from './components/Services.jsx'
import BeforeAfter from './components/BeforeAfter.jsx'
import Results from './components/Results.jsx'
import Faq from './components/Faq.jsx'
import Quote from './components/Quote.jsx'
import Footer from './components/Footer.jsx'
import { Curve } from './components/Reveal.jsx'
import { ThemeContext, useThemeState } from './hooks/useTheme.js'

export default function App() {
  const theme = useThemeState()
  return (
    <ThemeContext.Provider value={theme}>
      <a className="skip" href="#orcamento">
        Pular para o orçamento
      </a>
      <Nav />
      <main>
        <Stage />
        <Services />
        <BeforeAfter />
        <Curve />
        <Results />
        <Faq />
        <Quote />
      </main>
      <Footer />
    </ThemeContext.Provider>
  )
}
