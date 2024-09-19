import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validateEmail, validatePassword } from '../utilities/validations'
import{ Link } from 'react-router-dom'
import { registerApi } from '../apis/authentication'
import { loginApi } from '../apis/authentication'

const initialErrorsState = {
    email: '',
    password: '',
    api: '',
}

const Authentication = ({pageType}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(initialErrorsState)

    const handleEmailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {}

        if (!validateEmail(email)){
            newErrors = {
                ...newErrors,
                email: 'Invalid email'
            }            
        }
        if (!validatePassword(password)){
            newErrors = {
                ...newErrors,
                password: 'Password should be atleast 6 characters long'
            }              
        }

        setErrors(newErrors)
        const hasErrors = Object.values(newErrors).some(error => error!== '');
        if (hasErrors) {
            return
        }

        if(pageType === PageType.LOGIN){
            const [result, error] = await loginApi({
                user: {   
                    email: email,
                    password: password
                }
                })
            handleResponse([result, error])
        }
        else{
            const [result, error] = await registerApi({
                user: {   
                    email: email,
                    password: password
                }
                })
            handleResponse([result, error])                       
        }
    }

    const handleResponse = ([result, error]) => {
        if (error){
            setErrors({
                ...errors,
                api: error
            })
        }
        else{
            const message = result.message
            const user = result.data

            if(pageType === PageType.LOGIN) {
                navigate('/')
            }
            else {
                navigate('/login')
            }
        }
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
                <h3 className="text-2xl font-bold">
                {(pageType === PageType.LOGIN) ? 'Login' : 'Register'}
                </h3>
                {(pageType === PageType.LOGIN) ?
                    <p className='mt-4'>Not a user?
                    <Link to='/register' className='ms-1 underline'>Register</Link>    
                    </p>
                    :
                    <p className='mt-4'>Already a user?
                    <Link to='/login' className='ms-1 underline'>Login</Link>    
                    </p>
                }
                

                <form onSubmit={handleSubmit} className="flex flex-col max-w-96 mt-10 gap-8">
                    <div>
                    <input 
                    name="email"
                    type="email" 
                    className="w-full py-2 border border-gray-600 rounded px-3"
                    placeholder='Enter email'
                    value={email}
                    onChange={handleEmailChange}
                    />

                    { errors.email && <p className='text-sm text-medium text-red-500 mt-1'> {errors.email} </p> }
                    </div>

                    <div>
                    <input 
                    name="password"
                    type="password" 
                    className="w-full py-2 border border-gray-600 rounded px-3"
                    placeholder='Enter password'
                    value={password}
                    onChange={handlePasswordChange}
                    />

                    { errors.password && <p className='text-sm text-medium text-red-500 mt-1'> {errors.password} </p> }
                    </div>
                     
                    <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded text-white'> 
                        {(pageType === PageType.LOGIN) ? 'Login' : 'Register'}
                    </button>

                    { errors.api && <p className='text-sm text-medium text-red-500 mt-1'> {errors.api} </p> }
                </form>
            </div>            
        </div>
    )
}

export const PageType = Object.freeze({
    LOGIN : 0,
    REGISTER : 1
})

Authentication.propTypes = {
    pageType: PropTypes.number.isRequired
}

export default Authentication