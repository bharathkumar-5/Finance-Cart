import React from "react"
import { Link } from "react-router-dom"
import heroImg from "../assets/finance-hero.jpg"
import secureImg from "../assets/secure.png"
import supportImg from "../assets/support.png"
import growthImg from "../assets/growth.png"

const Home = () => {
  return (
    <div className="w-full">
  
      <section className="relative w-full min-h-screen flex items-center">
      
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        ></div>

       
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/40"></div>

        
        <div className="relative z-10 container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
              Take Control of Your Finances
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Explore our financial services, manage subscriptions, and make smart investments with VertoFX
            </p>
            <Link
              to="/services"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 hover:scale-105"
            >
              Explore Services
            </Link>
          </div>

          
          <div className="md:w-1/2 relative">
            <div className="w-full h-80 md:h-[500px] clip-path-diagonal overflow-hidden rounded-xl shadow-lg">
              <img
                src={heroImg}
                alt="Finance Hero"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      
      <div className="container mx-auto p-6 mt-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose VertoFX</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img src={secureImg} alt="Secure Transactions" className="w-20 h-20 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Secure Transactions</h3>
            <p className="text-gray-600">All your payments and subscriptions are fully protected</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img src={supportImg} alt="24/7 Support" className="w-20 h-20 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">We are always available to help you with any issue</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img src={growthImg} alt="Smart Investments" className="w-20 h-20 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Smart Investments</h3>
            <p className="text-gray-600">Grow your wealth efficiently with our tools and insights</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home