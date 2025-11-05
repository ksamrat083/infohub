import React, { useState } from 'react'
import WeatherModule from './modules/WeatherModule'
import ConvertModule from './modules/ConvertModule'
import QuoteModule from './modules/QuoteModule'

export default function App() {
  const [tab, setTab] = useState('weather')
  return (
    <div className="container">
      <div className="header">
        <h1>InfoHub</h1>
        <div className="small">Weather • Currency • Quotes</div>
      </div>

      <div className="tabs">
        <div className={`tab ${tab==='weather' ? 'active' : ''}`} onClick={()=>setTab('weather')}>Weather</div>
        <div className={`tab ${tab==='convert' ? 'active' : ''}`} onClick={()=>setTab('convert')}>Converter</div>
        <div className={`tab ${tab==='quote' ? 'active' : ''}`} onClick={()=>setTab('quote')}>Quotes</div>
      </div>

      <div className="module">
        {tab === 'weather' && <WeatherModule />}
        {tab === 'convert' && <ConvertModule />}
        {tab === 'quote' && <QuoteModule />}
      </div>
    </div>
  )
}
