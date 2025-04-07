import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div>

      <div className='flex items-center w-full h-[7vh] px-3 font-handjet bg-primary-2'>
        <h1 className='text-5xl text-white'>Dev. Blog</h1>
        <h1 className='pl-1 text-xl place-self-end content-end text-t-white'>Heikku J.</h1>
      </div>

      <div className='flex flex-row py-[2px] justify-around font-handjet text-2xl bg-primary-3 border-y-1 border-t-white'>
        <div className='flex hover:bg-primary-2 w-full justify-center'>
          <Link href='https://github.com/heikkuj' target='_blank'><h2>GitHub</h2></Link>
        </div>

        <div className='flex hover:bg-primary-2 w-full justify-center'>
        <Link href="#" target='_blank'><h2>Portfolio</h2></Link>
        </div>
      </div>
    </div>
  )
}
