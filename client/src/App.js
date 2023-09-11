import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/index';
import Login from "./pages/login";
import Test from "./components/test";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/processpages" element={<Index />}></Route>
        <Route path="/pdf2excel" element={<Index />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;