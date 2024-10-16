import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MemeProvider } from "./contexts/MemeContext";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <MemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </MemeProvider>
  );
}

export default App;
