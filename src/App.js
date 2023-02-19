import './App.css';
import Dashboard from './views/Dashboard/Dashboard';
import Header from './components/Common/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contact from './views/contact/Contact';
import Footer from './components/Common/Footer/Footer';
import Login from './views/Login/Login';
import Register from './views/Register/Register';



function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
