import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StatsStrip from './components/StatsStrip.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Features from './components/Features.jsx'
import LinksTable from './components/LinksTable.jsx'
import Footer from './components/Footer.jsx'

const INITIAL_LINKS = [
  {
    short: 'lnk.sh/x7F2a',
    original: 'exemplo.com.br/produtos/categoria/eletronicos?ref=campanha',
    clicks: '1.204',
    date: '18 ago 2026',
  },
  {
    short: 'lnk.sh/promo-verao',
    original: 'loja.exemplo.com/campanhas/verao-2026/desconto',
    clicks: '842',
    date: '15 ago 2026',
  },
  {
    short: 'lnk.sh/9kLp2',
    original: 'docs.exemplo.com/relatorios/trimestre-3',
    clicks: '96',
    date: '10 ago 2026',
  },
]

function generateCode(length = 5) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

function truncate(str, max = 60) {
  return str.length > max ? str.slice(0, max) + '…' : str
}

export default function App() {
  const [activeTab, setActiveTab] = useState('encurtar')
  const [links, setLinks] = useState(INITIAL_LINKS)

  const handleShorten = (originalUrl) => {
    const cleaned = originalUrl.replace(/^https?:\/\/(www\.)?/, '')
    const newLink = {
      short: `lnk.sh/${generateCode()}`,
      original: truncate(cleaned),
      clicks: '0',
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }
    setLinks((prev) => [newLink, ...prev])
  }

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <Hero onShorten={handleShorten} />
      <StatsStrip />
      <HowItWorks />
      <Features />
      <LinksTable links={links} />
      <Footer />
    </>
  )
}
