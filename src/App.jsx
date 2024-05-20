import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import ProductPage from "./pages/ProductPage";
import { AnimatePresence } from "framer-motion";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <main className="w-full h-screen flex items-start justify-center">

        <Routes  >
          <Route path="/" element={<DashBoard />} />
          <Route  path="/view" element={<ProductDetails/>} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>

    </main>
  );
}

export default App;
