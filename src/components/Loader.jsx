import React from 'react'

function Loader() {
  return (

          <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
              <div className="relative w-8 h-8 md:w-16 md:h-16">
                <div
                  className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
                  style={{"animationDuration": "1.5s"}}
                ></div>

              </div>

              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"
              ></div>
            </div>
          </div>

    
  )
}

export default Loader
