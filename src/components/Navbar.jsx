import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = async(e) => {       
        navigate('/login')

    }
    return (
        <div className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl">
                        Listado de Productos
                    </p>
                    <div className="">
                        <button onClick={handleLogout} className="bg-indigo-500 text-white rounded px-3 py-1.5 my-4">Log out</button>
                    </div>
                </div>
            </div>
        </div>            
    )
}

export default Navbar