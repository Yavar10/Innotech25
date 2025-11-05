import React from 'react'
import { Target, Bug, Languages } from "lucide-react";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

import crop from '../../assets/crop.avif'



const Hero = () => {
   const navigate = useNavigate();
  return (
    <div id='home' className='bg-gradient-to-br from-green-100 via-white to-green-100 flex justify-between items-center  w-full'>
      <div className='w-[50%] flex flex-col gap-6 justify-center items-start p-10'>
        
        <div>
            <p className='bg-green-100 rounded p-1 text-green-600 text-[12px]'>AI-Powered Crop Protection</p>
        </div>

        <div>
            <p className='text-[75px]'>Diagnose Crop Diseases in <span className='text-green-600'>3</span></p>
            <p className='text-[75px] text-green-600'>Seconds</p>
            <p className='text-[30px] text-gray-600'>AI-powered disease detection for 146 million farmers</p>
        </div>

         <div className='flex items-center gap-4'>
        <button className='text-[20px] rounded h-[60px] p-2 text-white bg-green-600 hover:bg-green-800 flex items-center gap-2'>Download App <ArrowRight className="w-6 h-6 text-white" /></button>
        <button onClick={() => navigate("/")} className='text-[20px] rounded p-2 h-[60px] hover:bg-gray-200 flex items-center gap-2'><Play className="w-6 h-6 text-black" /> Watch Demo</button>
      </div>

<div className=' flex justify-between w-full items-center'>
            <div className="shadow-sm hover:shadow-lg p-4 border-grey-600 rounded-2xl flex flex-col mt-[10px] justify-center  sm:w-[30%] w-auto">
              <p className="text-green-600 text-[25px] font-semibold flex items-center gap-2"><Target className="w-6 h-6 text-green-600" />94.6%</p>
              <p className="text-gray-600"> Accuracy </p>
            </div>
            <div className="shadow-sm hover:shadow-lg p-4 border-grey-600 rounded-2xl flex flex-col justify-center   w-[30%] sm:w-[30%] w-auto">
              <p className="text-green-600 text-[25px] font-semibold flex items-center gap-2"><Bug className="w-6 h-6 text-green-600" />18</p>
              <p className="text-gray-600">
                Diseases
              </p>
            </div>
            <div className="shadow-sm hover:shadow-lg p-4 border-grey-600 rounded-2xl flex flex-col justify-center  w-[30%] sm:w-[30%] w-auto">
              <p className="text-green-600 text-[25px] font-semibold flex items-center gap-2"> <Languages className="w-6 h-6 text-green-600" />2</p>
              <p className="text-gray-600">Languages</p>
            </div>
</div>
       

      </div>
{/* right side */}

      <div className='flex justify-center items-center w-[40%] h-[600px]'>
        <div className='w-[50%] border-16 h-[95%] rounded-4xl flex justify-center z-0 items-center overflow-hidden relative shadow-green-600'><div className='w-[50%] bg-black absolute h-[2%] rounded-b-2xl border-b-8 border-l-8 border-r-8 z-1 top-0'><img src="" alt="" /></div><img  className='scale-150 hover:scale-160 transition-transform duration-300 ease-in-out z-0' src={crop} alt="" /></div>
      </div>
    </div>
  )
}

export default Hero
