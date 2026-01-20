
import ProductPage from './components/ProductPage';
import ProfilePage from './components/ProfilePage'
import SkinDataForm from './components/SkinDataForm'
import Login from './components/Login'
import Register from './components/Register'
import MainLayout from "./components/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return <>
<BrowserRouter>
<Routes>
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register/>} />

<Route path="/" element={<MainLayout />}>
 <Route path="/product" element={<ProductPage />} index/>
 <Route path="/profile" element={<ProfilePage />} />
<Route path="/datafillUp" element={<SkinDataForm />} />
<Route path="/faceScanPage" element={<SkinDataForm />} />
</Route>

</Routes>
</BrowserRouter>
  </>
}

export default App