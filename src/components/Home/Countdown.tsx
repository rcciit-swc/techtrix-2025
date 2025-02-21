'use client';
import React, { useEffect, useState } from 'react';

const Countdown = () => {
  const targetDate = new Date('March 6, 2025 10:00:00').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="grid grid-flow-col gap-5 text-center auto-cols-max font-kagitingan tracking-widest">
      <div className="flex flex-col p-2 bg-transparent backdrop-blur-sm border-yellow-200 border-2 rounded-md text-white">
        <span className="countdown font-kagitingan text-5xl">{timeLeft.days}</span>
        Days
      </div>
      <div className="flex flex-col p-2 bg-transparent backdrop-blur-sm border-yellow-200 border-2 rounded-md text-white">
        <span className="countdown font-kagitingan text-5xl">{timeLeft.hours}</span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-transparent backdrop-blur-sm border-yellow-200 border-2 rounded-md text-white">
        <span className="countdown font-kagitingan text-5xl">{timeLeft.minutes}</span>
        min
      </div>
      <div className="flex flex-col p-2 bg-transparent backdrop-blur-sm border-yellow-200 border-2 rounded-md text-white">
        <span className="countdown font-kagitingan text-5xl">{timeLeft.seconds}</span>
        sec
      </div>
    </section>
  );
};

export default Countdown;
