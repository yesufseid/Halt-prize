import Link from "next/link"
import Image from "next/image";
import logo from"@/public/Paucek and Lage_20251109_063716_0000 (2).png"
import b1 from "@/public/1.png"
import b2 from "@/public/2.jpg"
import b3 from "@/public/3.png"
import b4 from "@/public/4.png"
import { FaTelegramPlane, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      {/* <header className="border-b border-border py-5">
        <nav className="max-w-7xl lg:mx-auto lg:px-4 sm:px-0   flex   items-center justify-between">
          <div className="flex items-center gap-2 ml-3">
            <div className=" flex items-center ">
               <Image src={logo} alt="Logo" width={50} height={50} />
            </div>
            <span className="lg:text-2xl text-xl font-semibold">Hult Prize <br className="flex lg:hidden" /> AASTU</span>
          </div>
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
      </header> */}

      {/* Hero Section */}
      <section  className="relative bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8 py-16 lg:py-12 " >
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-6xl font-bold text-balance leading-tight">
            Build the Future <br /> with Your Team
          </h1>
          <p className="text-lg  text-amber-50 max-w-2xl mx-auto text-balance ">
            Register and find your perfect teammates for the Hult Prize AASTU business idea competition. 
            Match with others based on your skills, roles, and shared vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/form"
               style={{
          backgroundColor: "white", // camelCase
          color: "#d93051",
         
        }}
              className="bg-primary text-xl font-extrabold text-white px-8 py-3 rounded-full  hover:bg-primary/90 transition inline-block"
            >
              Start Registering
            </Link>
            <Link
              href="/teams"
              style={{
          backgroundColor: "white", // camelCase
          color: "#d93051",
         
        }}
              className="border border-border px-8 py-3 rounded-full font-bold hover:bg-secondary transition inline-block"
            >
              View Teams
            </Link>
          </div>
          <div className=" pt-4 text-amber-50  text-xs max-w-2xl mx-auto text-balance ">
            If you already have your team and Business idea register here.
             <Link
              href="https://www.hultprize.org/register/"
              className="text-blue-500"
            >
              https://www.hultprize.org/register/
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div 
               style={{
          backgroundColor: "#005b96", // camelCase
          color: "white",
         
        }}
              className="w-12 h-12 mx-auto bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-center ">Register</h3>
              <p className="text-muted-foreground text-center">Complete your profile with skills, experience, and preferences</p>
            </div>
            <div className="space-y-4">
              <div
                style={{
          backgroundColor: "#005b96", // camelCase
          color: "white",
         
        }}
              className="w-12 h-12 bg-primary mx-auto rounded-lg flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-center">Match</h3>
              <p className="text-muted-foreground  text-center">
                Get matched with teammates who share your goals and complement your skills
              </p>
            </div>
            <div className="space-y-4">
              <div 
             style={{
          backgroundColor: "#005b96", // camelCase
          color: "white",
         
        }} 
              className="w-12 h-12 mx-auto bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-center">Innovate</h3>
              <p className="text-muted-foreground  text-center">Build your solution for sustainable development challenges</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Ready to Change the World?</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Register now and start building your dream team to tackle global challenges.
        </p>
        <Link
          href="/form"
          style={{
          backgroundColor: "#d93051", // camelCase
          color: "white",
         
        }}
          className="bg-primary text-white px-8 py-5 rounded-full font-medium hover:bg-primary/90 transition inline-block"
        >
          Register Now
        </Link>
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
         <div className="flex gap-3 justify-center items-center w-full">

        <Image src={b1} alt="Logo" width={100} className="rounded-full " height={100}  />
             <Image src={b3} alt="Logo"   width={150} height={150} className="rounded-full" />
         </div>
         <div className=" flex-col gap-2 justify-center items-center w-full ">
           <div className="text-pink-500 font-semibold">Follow our social media</div>
           <div className=" flex gap-2 justify-center items-center w-full " >

             {/* Telegram */}
      <a
        href="https://t.me/hultprizeaastu"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#0088cc] transition"
      >
        <FaTelegramPlane  className="w-10 h-10" />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/hultprizeaastu?igsh=MW5taWxuMXR1NnlxOA=="
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-pink-500 transition"
      >
        <FaInstagram className="w-10 h-10" />
      </a>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@hultprize.aastu?_t=ZM-90Sz2yiEMzU&_r=1"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-black transition"
      >
        <FaTiktok className="w-10 h-10" />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/hultprizeaastu/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#0A66C2] transition"
      >
        <FaLinkedin className="w-10 h-10" />
      </a>
        </div>
         </div>
         <div className="flex gap-3 justify-center items-center w-full">
             <Image src={b2} alt="Logo" width={80} height={80}  className="rounded-full " />
              <Image src={b4} alt="Logo" width={100} height={100} className="rounded-full " />
         </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Hult Prize AASTU. Building solutions for a better world.</p>
        </div>
      </footer>
    </main>
  )
}
