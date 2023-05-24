import './App.css';
import Dashboard from './views/Dashboard/Dashboard';
import Header from './components/Common/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contact from './views/contact/Contact';
import Footer from './components/Common/Footer/Footer';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import CampaignDetail from './components/CampaignDetail/CampaignDetail';
import AddCampaign from './components/Campaign/AddCampaign';
import GetProductDetail from './components/Products/GetProductDetail';
import Order from './views/Orders/Order';
import CategoryDetail from './components/CategoryDetail/CategoryDetail';
import Checkout from './views/Checkout/Checkout';
import ProtectedRoutes from './protectedRoute';
import Error from './views/404/Error';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/contact" element={<Contact />} />
              <Route path="/campaign/:id" element={<CampaignDetail />} />
              <Route path="/product/:id" element={<GetProductDetail />} />
              <Route path="/category/:id" element={<CategoryDetail />} />
              <Route path="/order" element={<Order />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/addcampaign" element={<AddCampaign />} />
            </Route>
            <Route path="/404" element={<Error />} />
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
