import React from 'react';

const EventDetails = ({categoryId}: {categoryId: string}) => {
  return (
    <div className="relative max-w-5xl mx-auto p-6 pt-44">
      <h1
        id="glowPink"
        className="text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-6"
      >
        {categoryId}
      </h1>

      <div className="relative border border-white rounded-lg p-8 md:p-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Left Column - Responsive Image Box */}
          <div className="w-full sm:w-[70%] md:w-[60%] aspect-[5/6] bg-gray-800 rounded-md" />

          {/* Right Column - Event Details */}
          <div className="w-full flex flex-col items-center justify-center space-y-10">
            <h2
              id="glowPurple"
              className="text-5xl sm:text-6xl font-bold text-transparent font-kagitingan text-center"
            >
              <span className="block">EVENT</span>
              <span className="block">NAME</span>
            </h2>

            <div className="relative flex flex-col justify-start w-2/3 px-6 py-8 rounded-3xl bg-gradient-to-tl from-black via-black/70 to-gray-800 border border-white shadow-lg">
              <h2 className="text-white font-kagitingan text-lg">
                EVENT COORDINATORS
              </h2>
              <p className="font-alexandria text-gray-300 mt-2">Name name</p>
              <p className="font-alexandria text-gray-300 mt-2">Name name</p>
            </div>
          </div>
        </div>

        <div className="place-self-center">
          <button className="mt-10 px-10 py-3 font-alexandria rounded-full bg-gradient-to-b from-[#B700FF] via-[#D966FF] to-[#F4A1FF]">
            Register Now
          </button>
        </div>

        {/* Event List */}
        <div className="mt-12 space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="group flex items-center space-x-4 p-4 rounded-lg"
            >
              <h3
                id="glowPink"
                className="text-xl md:text-2xl font-kagitingan text-purple-300"
              >
                EVENT NAME :
              </h3>
              <p className="text-lg md:text-xl font-alexandria gray-400">
                blah blah blah
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
