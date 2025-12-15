import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { BookDetail } from "./pages/BookDetail/BookDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/libro/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
