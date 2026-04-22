import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./components/home";
import About from "./components/about";
import Allsandle from "./components/allsandle";
import Allperfume from "./components/allperfumes";
import Login from "./components/login";
import Signup from "./components/signup";
import ProductDetail from "./components/productdetail";
import Checkout from "./components/checkout";
import Profile from "./components/profile";
import KanduraSlider from "./components/kandurasec";
import OrderSuccess from "./components/ordersuccess";
import PolicyPage from "./components/terms";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>} >
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/allsandle" element={<Allsandle />} />
      <Route path="/allperfume" element={<Allperfume />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/kandura" element={<KanduraSlider />} />
      <Route path="/terms" element={<PolicyPage />} />
      

      </Route>
      <Route path="checkout" element={<Checkout />} />
      <Route path="/success" element={<OrderSuccess />} />
      

    </Routes>
    </BrowserRouter>
  )
}
export default App