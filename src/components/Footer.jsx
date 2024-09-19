import Youtube from "../assets/youtube.svg"
import LinkeIn from "../assets/linkedin.svg"
import Github from "../assets/github.svg"

const Footer = () =>{
    return (
        <>
        <div className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between items-center gap-2">
                    <div className="flex gap-3 ">
                        <img className="w-6 h-6" src={Github} />
                        <img className="w-6 h-6" src={Youtube} />
                        <img className="w-6 h-6" src={LinkeIn} />
                    </div>
                    <p className="mt-4 font-medium text-sm text-gray-600">
                        © 2024 Digital Art. All rights reserved. 
                    </p>
                    <p className="flex items-center font-medium text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                    strokeWidth="2" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>

                        Developed by Angela Escobar. 

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                    strokeWidth="2" stroke="currentColor" className="size-4 fill-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>

                    </p>
                    
                </div>
            </div>
        </div>     
        </>
    )
}

export default Footer