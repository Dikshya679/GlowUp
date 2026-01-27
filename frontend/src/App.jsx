
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
<Route path="/Searchproducts" element={<SearchResults />} />
</Route>

</Routes>
</BrowserRouter>
  </>
}

export default App