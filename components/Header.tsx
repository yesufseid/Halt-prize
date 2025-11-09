import React from 'react'
import logo from"@/public/Paucek and Lage_20251109_063716_0000 (2).png"
import { FaTelegramPlane, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import Link from "next/link"
import Image from "next/image";
export default function Header() {
  return (
    <header className="border-b border-border py-5">
            <nav className="max-w-7xl lg:mx-auto lg:px-4 sm:px-0   flex   items-center justify-between">
                <Link href={"/"} >
              <div className="flex items-center gap-2 ml-3">
                <div className=" flex items-center ">
                   <Image src={logo} alt="Logo" width={50} height={50} />
                </div>
                <span className="lg:text-2xl text-xl font-semibold">Hult Prize <br className="flex lg:hidden" /> AASTU</span>
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
