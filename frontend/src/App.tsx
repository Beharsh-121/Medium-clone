import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Navbar from "./components/NavBar";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import FullBlog from "./pages/FullBlog";
import Profile from "./pages/Profile";
import NewBlog from "./pages/NewBlog";

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/" element={<Index/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/blog/:id" element={<FullBlog/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/newBlog" element={<NewBlog/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
