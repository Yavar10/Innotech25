import React from 'react'
import { Leaf } from 'lucide-react'

const NavigationBar = () => {
  return (
    <div className='h-[100px] w-full flex justify-between items-center border-b'>
        <div className='gap-4 h-[80%] ml-[10px] w-[20%] flex  items-center' >
     <Leaf className=' h-[80%] w-[20%] rounded bg-green-600' size={32} color="white" />
      <h1 className='text-[25px] font-semibold'>FarmVision</h1>
        </div>
      <ul className='flex justify-around items-center w-[30%] text-green-600 text-[20px]'>
                    <li className="hover:text-green-600 cursor-pointer">Features</li>
            <li className="hover:text-green-600 cursor-pointer">How It Works</li>
            <li className="hover:text-green-600 cursor-pointer">Schemes</li>
            <li className="hover:text-green-600 cursor-pointer">Pricing</li>
            <li className="hover:text-green-600 cursor-pointer">FAQ</li>
      </ul>
    </div>
  )
}

export default NavigationBar
