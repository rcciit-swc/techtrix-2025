import ComingSoon from '@/components/common/ComingSoon';
import ContactCard from '@/components/contacts/ContactCard';
import GalleryCard from '@/components/gallery/GalleryCard';
import { contactData } from '@/utils/constraints/constants/contacts';
import { sampleData } from '@/utils/constraints/constants/gallery';
import React from 'react';

const page = () => {
  return (
    <div className="w-full h-full relative flex flex-col min-h-screen max-lg:pt-40 pt-40 pb-20 items-center justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/assets/Home/bg2.mp4" // Change this to your video file path
        autoPlay
        loop
        muted
      />
      <h1
        id="glowPink"
        className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-left z-10"
      >
        Contacts
      </h1>
      {contactData.map((data, index) => (
        <div key={index} className="w-full max-w-7xl mx-auto px-4">
          <h1
            id="glowPink"
            className="text-3xl sm:text-2xl md:text-4xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-center z-10"
          >
            {data.name}
          </h1>

          <div className="flex flex-row justify-center items-center flex-wrap gap-16 p-4 mb-4 justify-items-center">
            {data.contacts.map((contact, contactIndex) => (
              <ContactCard
                key={contactIndex}
                image={contact.image}
                name={contact.name}
                role={contact.role}
                phone={contact.phone}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
