import React from 'react'
import Link from 'next/link'

export default function home() {
  const emailAddress = 'anjanamanoj117@gmail.com';
  return (
    <div style={{backgroundImage: 'url(ab.jpg)'}} className="h-screen bg-cover w-screen  flex flex-col  ">
            <div className='bg-cyan-800 h-12 w-screen  text-white flex pt-3 justify-end justify-between'>
                <div><Link href="/read"><button className=''>View more</button></Link> </div>
                <div>
                    <Link href="/delogin"><button className=' w-32'>De-Login </button></Link>
                    <Link href="/login"><button className=' w-32'>Login </button></Link>
                    <Link href="/signup"><button className=' w-36'>Signup </button></Link>
                </div>
            </div >
            <div className=' text-center text-white text-6xl h-2/3 w-screen flex flex-col justify-center align-middle'>
                <h3>USER AUTHENTICATION USING RSA</h3><br/>
                <h3 className=' text-base' > password encrypton using RSA</h3>
            </div>
            <div className=' bg-transparent h-40'></div>
            <div className='bg-cyan-800 h-12 w-screen  text-white flex pt-3 justify-end justify-between'>

            <a href={`mailto:${emailAddress}`} className=' w-32 text-white py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:bg-blue-700'>
            Contact
          </a>
          <div> <Link href="/danger"><button className='  w-48'></button></Link></div>
               <div> <Link href="/read"><button className='  w-48'>Terms & Conditions</button></Link></div>
                
            </div>

        
    </div>
    
  )
}


