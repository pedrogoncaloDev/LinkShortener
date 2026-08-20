import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Features from './components/Features.jsx'
import LinksTable from './components/LinksTable.jsx'
import Footer from './components/Footer.jsx'
import { shortenUrl } from './api.js'

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

function truncate(str, max = 60) {
  return str.length > max ? str.slice(0, max) + '…' : str
}

function stripProtocol(str) {
  return str.replace(/^https?:\/\/(www\.)?/, '')
}

export default function App() {
  const [activeTab, setActiveTab] = useState('encurtar')
  const [links, setLinks] = useState(INITIAL_LINKS)

  const handleShorten = async (originalUrl) => {
    const { shortened_url: shortUrl } = await shortenUrl(originalUrl)

    const newLink = {
      short: stripProtocol(shortUrl),
      shortUrl,
      original: truncate(stripProtocol(originalUrl)),
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
      <HowItWorks />
      <Features />
      <LinksTable links={links} />
      <Footer />
    </>
  )
}
