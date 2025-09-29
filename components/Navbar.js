import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='h-14 bg-green-700 text-white flex items-center justify-between px-4'>
        <Link className='font-bold text-2xl' href="/">
        CutLink
        </Link>
      <ul className='flex justify-center items-center gap-4'>
        <Link href="/"><li>Home</li></Link>
        <Link href="/about"><li>About</li></Link>
        <Link href="/shorten"><li>Shorten</li></Link>
        <Link href="/contact"><li>Contact Us</li></Link>
        <li className='flex gap-3'>
            <Link href="/shorten" className='bg-green-500 shadow-lg rounded-lg p-3 py-1 font-bold '><button>Try now</button></Link>
            <Link href="/github" className='bg-green-500 shadow-lg rounded-lg p-3 py-1 font-bold '><button>Github</button></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
