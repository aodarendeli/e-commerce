import './App.css';
import Dashboard from './views/Dashboard/Dashboard';
import Header from './components/Common/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contact from './views/conacat/Contact';
import Footer from './components/Common/Footer/Footer';



function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
