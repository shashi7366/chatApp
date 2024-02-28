import './LandingPage.css';

import Logo from '../../components/Logo';

import {useNavigate} from "react-router-dom";


function LandingPage(){

    const navigate=useNavigate();


    return <div className="h-screen w-full flex flex-col justify-center items-center lpContainer">
       <div className='h-[90%] w-[90%] rounded-sm'>
       <div className='w-full flex justify-start'><Logo/></div>
        <div className='h-full max-h-[90%] w-full shadow-lg bg-white border rounded-sm flex flex-col px-4 py-4 border-box'>
            <div className='text-start py-4'>
            <p className='text-2xl font-light text-gray-600'>Message <br/> privately</p>
            <p className='font-light text-gray-500'>Simple, reliable, private messaging</p>
            </div>

            <div className='w-full h-[40%] flex flex-col justify-center items-center'>
                <button className='border rounded-full px-8 py-2 bg-[#15F5BA] hover:bg-white'
                onClick={()=>{
                    navigate("/login")
                }}>get Started</button>
            </div>
        </div>
       </div>
    </div>
}

export default LandingPage;