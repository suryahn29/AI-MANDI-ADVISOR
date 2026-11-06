import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FarmerInput from "./pages/FarmerInput";
import MandiComparison from "./pages/MandiComparison";
import Recommendation from "./pages/Recommendation";
import SellingAssistant from "./pages/SellingAssistant";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter
        basename={
          import.meta.env.BASE_URL === "/AI-MANDI-ADVISOR/"
            ? "/AI-MANDI-ADVISOR"
            : "/"
        }
      >
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/input" element={<FarmerInput />} />
            <Route path="/mandis" element={<MandiComparison />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/assistant" element={<SellingAssistant />} />
          </Routes>
        </main>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
