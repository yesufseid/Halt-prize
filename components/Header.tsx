import React from 'react'
import logo from"@/public/logo.png"
import { FaTelegramPlane, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import Link from "next/link"
import Image from "next/image";
export default function Header() {
  return (
    <header className="border-b border-border py-2">
            <nav className="max-w-7xl lg:mx-auto lg:px-4 sm:px-0   flex   items-center justify-between">
               <Link href={"/"} > <div className="flex items-center gap-2 ml-3"> 
                <div className=" flex items-center "> 
                  <Image src={logo} alt="Logo" width={70} height={70} /> </div>
                      <div className="flex flex-col">
      {/* <span className="text-xl lg:text-2xl font-semibold leading-snug">
        Hult Prize <span className="lg:hidden"><br /></span> AASTU
      </span> */}
      <span className="text-xl lg:text-2xl font-semibold leading-snug">Team Up</span>
    </div>
                      </div> 
                      </Link>
                <a
            href="https://t.me/ContactHultprizeAASTU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black text-xl hover:text-[#0088cc] mr-5 lg:mr-10 transition flex justify-center items-center gap-2"
          >
            <FaTelegramPlane  className="w-10 h-10 hidden lg:flex" />
            <span>Contact Us</span>
          </a>
            </nav>
          </header>
  )
}
