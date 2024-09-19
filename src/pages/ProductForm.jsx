import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getProducts, getProductById, updateProduct } from '../apis/products'

const initialErrorsState = {
    name: '',
    description: '',
    price: '',
    api: '',
}


const ProductForm = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState(initialErrorsState)
    const location = useLocation();
    const [product, setProduct] = useState([])
    const [productId, setProductId] = useState(null)

    
    useEffect(() => {
        const segments = location.pathname.split('/');
        const id = segments[segments.length - 1];
        setProductId(id);  // Guarda el id para su uso en la actualización
        getProductsApi(id);
    }, []);

    const getProductsApi = async (id) =>{
        const [result, error] = await getProductById(id)        
        handleResponse([result, error])
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price); 
    }
  
    const handleNameChange = (e) => {       
        setName(e.target.value)
    }
    const handleDescriptionChange = (e) => {       
        setDescription(e.target.value)
    }
    const handlePriceChange = (e) => {       
        setPrice(e.target.value)
    }
    const handleSubmit =  (e) => {
        e.preventDefault();

        let newErrors = {}

        if (name.length === 0){
            newErrors = {
                ...newErrors,
                name: 'Please enter name'
            }            
        }
        if (description.length === 0){
            newErrors = {
                ...newErrors,
                description: 'Please enter description'
            }              
        }
        if (price.length === 0){
            newErrors = {
                ...newErrors,
                price: 'Please enter price'
            }              
        }
        setErrors(newErrors)
        const hasErrors = Object.values(newErrors).some(error => error!== '');
        if (hasErrors) {
            return
        }    
            updateProductApi();
        
    }
   
    const updateProductApi = async () => {
        const [result, error] = await updateProduct({
            id: productId,  // Incluye el ID del producto en la solicitud de actualización
            product: {   
                name: name,
                description: description,
                price: price,
            },
        });
        handleResponse([result, error]);
    };

    const handleResponse = async ([response, error]) => {
        if (error){
            setErrors({
                ...errors,
                api: error
            }) 
        }
        else{
            const data = await response.json() 
            console.log("data", data)
            setProduct(data.data)       
            
        }
    }

    return(
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
                <div>
                    <h1 className='text-3xl text-black font-bold' >Edit Product</h1>
                </div>              
                <form onSubmit={handleSubmit} className="flex flex-col max-w-96 mt-10 gap-8">
                    <div>
                    <input 
                    name="name"
                    type="string" 
                    className="w-full py-2 border border-gray-600 rounded px-3"
                    placeholder='Enter name'
                    value={name}
                    onChange={handleNameChange}
                    />      

                    { errors.name && <p className='text-sm text-medium text-red-500 mt-1'> {errors.name} </p> }
                    </div>
                    <div>
                    <input 
                    name="description"
                    type="text" 
                    className="w-full py-2 border border-gray-600 rounded px-3"
                    placeholder='Enter description'
                    value={description}
                    onChange={handleDescriptionChange}
                    />

                    { errors.description && <p className='text-sm text-medium text-red-500 mt-1'> {errors.description} </p> }
                    </div>
                    <div>
                    <input 
                    name="price"
                    type="number" 
                    className="w-full py-2 border border-gray-600 rounded px-3"
                    placeholder='Enter price'
                    value={price}
                    onChange={handlePriceChange}
                    />

                    { errors.price && <p className='text-sm text-medium text-red-500 mt-1'> {errors.price} </p> }
                    </div>
                    <div>
                        <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded text-white'> 
                        Update
                        </button>
                        { errors.api && <p className='text-sm text-medium text-red-500 mt-1'> {errors.api} </p> }    
                    </div>
                </form>
            </div>            
        </div>
    )
}

    


export default ProductForm