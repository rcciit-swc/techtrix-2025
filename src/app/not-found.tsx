'use client';

import React from 'react';
import Image from 'next/image';
import BotAsset from '../../public/assets/error/image.png';

export default function NotFound() {
  const handleGoHome = () => {
    // Redirect the user to the home page
    window.location.href = '/';
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="m-0 p-0">
        <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6 text-center">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <h1 className='text-7xl capitalize'>ERROR 404</h1>
              <h1 className="text-3xl font-bold mb-4">
                Oops! Something went wrong.
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                We’re sorry, but an unexpected error occurred. Please click below to return to the
                home page.
              </p>
              <button
                onClick={handleGoHome}
                className="px-6 py-3 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors w-64"
              >
                Go Back Home
              </button>
            </div>
            <div className="relative inline-block">
              <div
                className="absolute top-0 right-[-180px] w-64 h-96 bg-purple-600 z-0"
              ></div>
              <Image
                src={BotAsset}
                alt="Error Bot"
                className="w-80 h-80 mb-6 object-contain relative z-10"
              />
            </div>
          </div>
        </div>
      </body>
    </html >
  );
}
