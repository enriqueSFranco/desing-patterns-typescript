import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const $app = document.getElementById('app') as HTMLElement
const $root = ReactDOM.createRoot($app)

$root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
