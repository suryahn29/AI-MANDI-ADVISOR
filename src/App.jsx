import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FarmerInput from "./pages/FarmerInput";
import MandiComparison from "./pages/MandiComparison";
import Recommendation from "./pages/Recommendation";
import SellingAssistant from "./pages/SellingAssistant";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

// Footer links open new pages at the top, not at the old scroll position.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

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
        <ScrollToTop />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/input" element={<FarmerInput />} />
            <Route path="/mandis" element={<MandiComparison />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/assistant" element={<SellingAssistant />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
