import React from 'react'
import { Leaf } from 'lucide-react'

const NavigationBar = () => {
  return (
    <div className='h-[100px] w-full flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-10'>
        <a href='#home' className='gap-4 h-[80%] ml-[10px] w-[25%] flex  items-center' >
                        <Leaf className=' h-[60%] w-[13%] rounded bg-green-600' size={32} color="white" />
                        <h1 className='text-[25px] font-semibold'>FarmVision</h1>
        </a>
      <ul className='flex justify-around items-center w-[50%] text-gray-600 text-[20px]'>
            <a href="#features" className="hover:text-gray-600 cursor-pointer">Features</a>
            <a className="hover:text-gray-600 cursor-pointer">How It Works</a>
            <a className="hover:text-gray-600 cursor-pointer">Schemes</a>
            <a className="hover:text-gray-600 cursor-pointer">Pricing</a>
            <a className="hover:text-gray-600 cursor-pointer">FAQ</a>
      </ul>
      <div className='flex w-[25%] justify-center items-center gap-4'>
        <button className='rounded p-2 hover:bg-gray-200'>Sign Up</button>
        <button className='rounded p-2 text-white bg-green-600 hover:bg-green-800 '>Download App</button>
      </div>
    </div>
  )
}

export default NavigationBar
