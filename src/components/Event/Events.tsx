"use client"

const Events = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a1a]">
      <div className="absolute w-full h-full top-0 left-0 z-0">
      </div>

      {/* Content layer */}
      <div className="relative z-10 w-full h-full px-4 py-6">
        <div className="flex justify-between items-center mt-20 px-4 md:px-8">
          <h2 className="text-white font-mono text-lg md:text-xl">OUT OF THE BOX</h2>
          <h2 className="text-white font-mono text-lg md:text-xl">AUTOMATA</h2>
        </div>
        <div className="flex flex-col items-center justify-center h-[calc(100%-6rem)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-8 w-full max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-white font-mono text-xl md:text-2xl mb-2">GAMING</div>
              
            </div>
            <div className="text-center">
              <div className="text-white font-mono text-xl md:text-2xl mb-2">ROBOTICS</div>
             
            </div>
            <div className="text-center">
              <div className="text-white font-mono text-xl md:text-2xl mb-2">FLAGSHIP</div>
              
            </div>
          </div>
          <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white font-mono text-lg md:text-2xl text-center">
                TEGTRIX
                <br />
                2025
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events

