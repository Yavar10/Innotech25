import React from 'react'
import { TrendingDown, Users, AlertTriangle } from "lucide-react";

const Challenges = () => {
  return (
    <div className='flex flex-col justify-between items-center gap-10 p-10 w-full h-125'>
        <div className='flex justify-center items-center flex-col'>
 <div><p className='text-[50px] font-semibold'>The Challenge Farmers Face</p></div>
      <div><p className='text-[25px] text-gray-600'>Traditional farming methods struggle with rapid disease identification, leading to devastating crop losses</p></div>
     
        </div>
      <div className="flex justify-around items-center w-full gap-10 flex-wrap">

  <div className="flex flex-col bg-red-50 justify-center items-center gap-4 p-6  rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-[300px]">
    <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-red-400 bg-red-50">
      <TrendingDown className="w-8 h-8 text-red-500" />
    </div>
    <p className="font-bold text-gray-800 text-lg">₹90,000 Cr Lost Annually</p>
    <p className="text-center text-gray-600 text-sm">
      Crop diseases cause massive economic losses to Indian farmers every year
    </p>
  </div>


  <div className="bg-blue-50 flex flex-col justify-center items-center gap-4 p-6  rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-[300px]">
    <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-blue-400 bg-blue-50">
      <Users className="w-8 h-8 text-blue-500" />
    </div>
    <p className="font-bold text-gray-800 text-lg">1 Officer per 1000 Farmers</p>
    <p className="text-center text-gray-600 text-sm">
      Severe shortage of agricultural experts leads to delayed diagnosis
    </p>
  </div>

 
  <div className="bg-yellow-50 flex flex-col justify-center items-center gap-4 p-6  rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-[300px]">
    <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-yellow-400 bg-yellow-50">
      <AlertTriangle className="w-8 h-8 text-yellow-500" />
    </div>
    <p className="font-bold text-gray-800 text-lg">35% Crop Loss</p>
    <p id='features' className="text-center text-gray-600 text-sm">
      Late detection and wrong treatment destroy potential harvests
    </p>
  </div>
</div>

    </div>
  )
}

export default Challenges
