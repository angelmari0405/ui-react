import { BASE_API } from './config'

export const addProduct = async (bodyObject) => {    
    
    const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject) 
    };
   
    try 
    {
        const response = await fetch(`${BASE_API}/products`, requestOptions);
        if(response.ok) 
        {            
            return [response,'']
        }      
        const errorMessage = await response.text();      
        return ['',`Server side error: ${errorMessage}`];
    } catch (error) 
    {
        return ['',`Server down: ${error}`]
    }

}
export const getProducts = async (bodyObject) => {    
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        } 
    };
   
    try 
    {
        const response = await fetch(`${BASE_API}/products`, requestOptions);
        if(response.ok) 
        {            
            return [response,'']
        }      
        const errorMessage = await response.text();      
        return ['',`Server side error: ${errorMessage}`];
    } catch (error) 
    {
        return ['',`Server down: ${error}`]
    }

}
export const deleteProduct = async (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(`${BASE_API}/products/${id}`, requestOptions);
        if(response.ok) {
            return [response, ''];
        }      
        const errorMessage = await response.text();      
        return ['', `Server side error: ${errorMessage}`];
    } catch (error) {
        return ['', `Server down: ${error}`];
    }
}

export const getProductById = async (id) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(`${BASE_API}/products/${id}`, requestOptions);
        if(response.ok) {
            return [response, ''];
        }
        const errorMessage = await response.text();
        return ['', `Server side error: ${errorMessage}`];
    } catch (error) {
        return ['', `Server down: ${error}`];
    }
};

// API to update a product by ID
export const updateProduct = async (id, productData) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    };

    try {
        const response = await fetch(`${BASE_API}/products/${id}`, requestOptions);
        if(response.ok) {
            return [response, ''];
        }
        const errorMessage = await response.text();
        return ['', `Server side error: ${errorMessage}`];
    } catch (error) {
        return ['', `Server down: ${error}`];
    }
};