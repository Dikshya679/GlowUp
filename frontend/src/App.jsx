
import ProductPage from './components/ProductPage';
import SkinDataForm from './components/SkinDataForm'
import Login from './components/Login'
import Register from './components/Register'
import MainLayout from "./components/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResults from './components/elementComponent/SearchResults';
import FeedbackPage from './components/FeebackPage';
import Dashboard from './components/ProfilePage';
import FaceScanningPage from './components/FaceScanningPage';

// 
import Homepage from './components/Homepage';
import BuyPage from './components/BuyPage';
import CartPage from './components/CartPage.Jsx';
import DiscussionForum from './components/DiscussionForum';
// 

const App = () => {
  return <>
<BrowserRouter>
<Routes>
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register/>} />

<Route path="/" element={<MainLayout />}>
 <Route path="/product" element={<ProductPage />} index/>
 <Route path="/profile" element={<Dashboard />} />
<Route path="/faceScanPage" element={<FaceScanningPage />} />
<Route path="/feedback" element={<FeedbackPage />} />
<Route path="/datafillUp" element={<SkinDataForm />} />
<Route path="/Searchproducts" element={<SearchResults />} />
<Route path="/datafillup" element={<SkinDataForm />} />
{/*  */}
<Route path="/cartPage" element={<CartPage />} />
<Route path="/buyPage" element={<BuyPage />} />
<Route path="/disscussionForum" element={<DiscussionForum />} />
<Route path="/homepage" element={<Homepage />} />
{/*  */}
</Route>

</Routes>
</BrowserRouter>
  </>
}

export default App