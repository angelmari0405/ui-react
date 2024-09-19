import { useState } from 'react'
import { addProduct } from '../apis/products'
import { useNavigate } from 'react-router-dom'
const initialErrorsState = {
    name: '',
    description: '',
    price: '',
    api: '',
}


const AddProduct = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState(initialErrorsState)

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
        addProductApi()
    }
    
    const addProductApi = async () =>{
        const [result, error] = await addProduct({
            product: {   
                name: name,
                description: description,
                price: price
            }
            })
        handleResponse([result, error])
    }

    const handleResponse = ([response, error]) => {
        if (error){
            setErrors({
                ...errors,
                api: error
            })
        }
        else{
            console.log("response", response)            
            navigate('/')            
        }
    }

    return(
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
                <h3 className="text-2xl font-bold">
                Crear Nuevo Producto
                </h3>         
              
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
                        Save
                        </button>
                        { errors.api && <p className='text-sm text-medium text-red-500 mt-1'> {errors.api} </p> }    
                    </div>
                </form>
            </div>            
        </div>
    )
}

    


export default AddProduct