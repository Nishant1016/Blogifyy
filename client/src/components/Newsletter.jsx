import React, { useState } from 'react'
import gradientBackground from '../assets/gradientBackground.png'
import { assets } from '../assets/assets'
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Newsletter = () => {

  const [email, setEmail] = useState("");

  const { axios } = useAppContext();

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const { data } = await axios.post("/api/newsletter/subscribe", {
              email,
          });

          if (data.success) {
              toast.success(data.message);
              setEmail("");
          } else {
              toast.error(data.message);
          }
      } catch (error) {
          toast.error(error.message);
      }
  };

  return (
    <section className='w-full'>
      <div className="relative overflow-hidden p-10 md:py-14 px-6 sm:px-12 lg:px-20 xl:px-28">

        <div className="flex flex-col md:flex-row md:items-center">

          {/* Left: text */}
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
              NEVER MISS AN UPDATE
            </p>
            <h2 className="mt-4 text-3xl font-bold text-primary md:text-5xl">
              Get curated insights <br /> delivered to you
            </h2>
            <p className="mt-5 text-gray-600 text-base md:text-lg">
              Practical tutorials, industry trends and expert opinions, <br /> 
              straight to your inbox.
            </p>
          </div>

          {/* Right: form */}
          <div className="flex-1">
            <form className="flex flex-col gap-3 mr-auto sm:flex-row" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 mx-auto rounded-xl border border-gray-300 bg-white px-6 py-2 text-gray-600 
                outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-8 py-1.5 font-medium text-white 
                transition hover:bg-indigo-500 cursor-pointer"
              >
                Subscribe →
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
              <span>✓ No spam, ever</span>
              <span>✓ High quality content</span>
              <span>✓ Unsubscribe anytime</span>
            </div>
          </div>

        </div>
      </div>  
    </section>
  )
}

export default Newsletter