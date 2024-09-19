import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const Product = () => {
    
    const location = useLocation();

    useEffect(()=>{
        const segments = location.pathname.split("/")
        const productId = segments[segments.length - 1]
    },[])

    return(
        <div>
            <p>Edit Product</p>

        </div>
    )
}
export default Product