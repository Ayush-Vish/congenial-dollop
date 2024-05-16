import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProductContextProvider from './context/product-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Context Provider for Products Data  */}
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </React.StrictMode>,
)
