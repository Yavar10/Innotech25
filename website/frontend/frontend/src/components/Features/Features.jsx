import React from 'react'
import { Camera, Wifi, Pill, Globe, DollarSign,Target } from "lucide-react";
import farmer from '../../assets/farmer.jpg'

const Features = () => {
  return (
    <div >
      <div className='flex flex-col justify-center items-center'>
        <p className='text-[50px] font-semibold'>One App. Complete Solution.</p>
        <p className='text-[25px] text-gray-600 mt-[10px]'>Everything a farmer needs to protect crops and maximize yield</p>
      </div>
      <div className='flex mt-[50px]'>
        <div className='w-[50%] flex justify-center items-center '> 
             <div className='flex justify-center items-center w-[40%] h-[600px] relative'>
                <div className='w-[100%] h-[95%] bg-green-600 rounded-4xl rotate-5 flex justify-center z-0 items-center overflow-hidden absolute  '></div>
                <div className='w-[100%] border-4 h-[95%] rounded-4xl flex justify-center z-1 items-center overflow-hidden absolute hover:rotate-[-3deg] transition-transform duration-300 '><div className='w-[50%] bg-black absolute h-[2%] rounded-b-2xl border-b-2 border-l-4 border-r-4 z-1 top-0'><img src="" alt="" /></div><img  className='scale-150 z-0' src={farmer} alt="" /></div>
              </div>
        </div>
        <div className='w-[50%]'>
         
         
         
          <div className="group w-[80%] rounded-2xl p-4 transition-all duration-300 hover:bg-green-50 hover:shadow-md cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-green-100 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
          <Camera size={40} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Instant AI Diagnosis</p>
          <p className="text-gray-600 text-sm">
            Snap a photo and get results in 3 seconds
          </p>
        </div>
      </div>
    </div>

          <div className="group w-[80%] rounded-2xl p-4 transition-all duration-300 hover:bg-green-50 hover:shadow-md cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-green-100 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
          <Wifi size={40} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Works Offline</p>
          <p className="text-gray-600 text-sm">
           No internet needed for disease detection
          </p>
        </div>
      </div>
    </div>

          <div className="group w-[80%] rounded-2xl p-4 transition-all duration-300 hover:bg-green-50 hover:shadow-md cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-green-100 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
          <Globe size={40} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">15 Indian Languages</p>
          <p className="text-gray-600 text-sm">
            Hindi, Punjabi, Tamil, Telugu & more
          </p>
        </div>
      </div>
    </div>

          <div className="group w-[80%] rounded-2xl p-4 transition-all duration-300 hover:bg-green-50 hover:shadow-md cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-green-100 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
          <Pill size={40} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Treatment Recommendations</p>
          <p className="text-gray-600 text-sm">
            Organic & chemical options with pricing
          </p>
        </div>
      </div>
    </div>

          <div className="group w-[80%] rounded-2xl p-4 transition-all duration-300 hover:bg-green-50 hover:shadow-md cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-green-100 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
          <DollarSign size={40} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Government Scheme Access</p>
          <p className="text-gray-600 text-sm">
            Connect to ₹9L+ in farmer benefits
          </p>
        </div>
      </div>
    </div>

          <div className="group w-[80%] rounded-2xl p-4 transition-all duration-300 hover:bg-green-50 hover:shadow-md cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-green-100 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
          <Target size={40} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">94.5% Accuracy</p>
          <p className="text-gray-600 text-sm">
            Trained on millions of crop images
          </p>
        </div>
      </div>
    </div>



        </div>
      </div>
    </div>
  )
}

export default Features
