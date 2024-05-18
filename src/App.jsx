import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <main className="w-full h-screen flex bg-yellow-50 items-start justify-center">

        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>

    </main>
  );
}

export default App;