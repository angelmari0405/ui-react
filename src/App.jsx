import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProductList from "./container/ProductList"
import { Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import ProductForm from "./pages/ProductForm.jsx"


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="products/:id" element={<ProductForm />} />
        
        <Route path="/" element={
          <>
          <ProductList />
          </>
        }>
        </Route>
      </Routes>    
      
      <Footer />    
    </>
  )
}

export default App