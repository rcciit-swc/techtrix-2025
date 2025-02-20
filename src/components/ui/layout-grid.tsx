'use client';
import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ButtonEvent from '../Home/ButtonEvent';

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          onClick={() => handleClick(card)}
          className={cn(
            'relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300',
            selected?.id === card.id
              ? 'absolute inset-0 h-1/2 md:h-full w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto z-50 flex justify-center items-center'
              : 'h-80 w-full'
          )}
          layoutId={`card-${card.id}`}
        >
          {selected?.id === card.id && <SelectedCard selected={selected} />}
          <ImageComponent card={card} />
        </motion.div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          'fixed inset-0 bg-black opacity-0 transition-opacity duration-600 z-10',
          selected?.id ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        'object-cover object-top absolute inset-0 h-full w-full transition duration-200'
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="h-full w-full flex flex-col md:flex-row justify-center items-center rounded-lg shadow-2xl relative z-[60] p-4">
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        className="absolute inset-0 h-full w-full bg-black opacity-70 z-10"
      />
      
      {/* Content Container */}
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative px-8 z-[70] flex flex-col md:flex-row justify-center items-center gap-4"
      > 
        <ButtonEvent text="Explore" />
      </motion.div>
    </div>
  );
};
