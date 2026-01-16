import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import LoginSignup from './LoginSignup';
import Layout from './Layout';
import { ThemeProvider } from './Theme/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginSignup />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/*' element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;