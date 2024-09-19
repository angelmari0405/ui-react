import { getProducts, deleteProduct } from '../apis/products'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import{ Link } from 'react-router-dom'


const ProductList = () => {

    const [products, setProducts] = useState([])
    const navigate = useNavigate() 
    
    useEffect(()=>{
        getProductsApi()
    })
    
    const getProductsApi = async () =>{
        const [result, error] = await getProducts()
        handleResponse([result, error])
    }

    const handleResponse = async ([response, error]) => {
        if (!error){
       
            console.log("response", response)            
            const data = await response.json() 
            setProducts(data.listProducts)           
        }
    }
    const handleNuevo = async() => {       
        navigate('/add-product')

    }
    const handleDelete = async (productId) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            const [result, error] = await deleteProduct(productId);
            if (!error) {
                setProducts(products.filter(product => product.id !== productId));
            } else {
                alert("There was an error deleting the product.");
            }
        }
    };

        

    return(
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
                <div>
                <h3 className="text-2xl font-bold mb-4">Products</h3>
                </div>                
                <div>
                <div className="">
                    <button onClick={handleNuevo} className="bg-indigo-500 text-white rounded px-3 py-1.5 my-4">New Product</button>
                </div>
                </div>
               

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="border border-gray-300 rounded-lg p-4">
                           <div>
                           <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                            <p className="text-gray-700 mb-2">{product.description}</p>
                            <p className="text-indigo-600 font-bold">${product.price}</p>
                           </div>
                            <div className="flex justify-end items-center gap-6">
                                <div>
                                <Link to={`/products/${product.id}`} className='ms-1 underline'>Edit</Link> 
                                </div>
                                <div>                                    
                                <button onClick={() => handleDelete(product.id)} className='ms-1 underline text-red-500'>Delete</button>
                                </div>                            
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
    
export default ProductList