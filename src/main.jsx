import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "../src/App.css"
import { ThemeProvider } from './Theme/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
