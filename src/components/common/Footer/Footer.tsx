import Link from "next/link";
import { FaInstagram, FaFacebook, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import SVGIcon from "../../SVGIcon";
import styles from "./Footer.module.css";
import React from "react";

export default function Footer() {
  const list = [
    { title: "Events", link: "/events" },
    { title: "Team", link: "/team" },
    { title: "Sponsorship", link: "https://drive.google.com/file/d/1UajjAiTHkHN2JItyHBcZBxWOVwAwtqIH/view?usp=sharing" },
    // { title: "Contact Us", link: "/contact" }
  ];
  
  return (
    <footer className="relative bg-black text-white py-8 px-4 overflow-hidden">
      {/* <SVGIcon
        iconName="box"
        className={`block absolute top-[20%] left-4 sm:left-10 w-40 sm:w-80 h-40 sm:h-80 ${styles.floatingIcon}`}
      />
      <SVGIcon
        iconName="box"
        className={`block absolute top-[10%] right-4 sm:right-10 w-28 sm:w-56 h-28 sm:h-56 ${styles.floatingIcon}`}
      /> */}
      
      <div className="absolute inset-0 bg-[url('https://s3-alpha-sig.figma.com/img/42c8/ad88/1017c056d7a1fba3474450df3754201e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FqWPFVNyWngDHFa4EXdRHRTaDprUVrYac5bGBS5MO-brHtQXZZD638v8dgtNUia1PKfeYjtHmpZAq~2ys92RJc0qOukf7v~WGRPhJxem5LsVncewqexjLjHE1z0qSiDPoDJ-JYZ5FHifDgTy1OsmsIV1iVKenqAJfT-9myFw6WECmEkDYoRCR-ZChGMpjSM7AS4mk4eOqI0CsJrO4CgrnULF43-~CBlUNDrb3OzEar0G0oNxg82PYoTo7aSt-s2jpEFHQKqke4q6JQl4oh-VoYRvooVQ87HBBHwJA0cocpwkqcSIerTs5DoDG9LhizNTNy5FcyexL5FLiffvYaThGQ__')] bg-cover bg-center filter blur-2xl opacity-40" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl md:text-5xl font-bold text-center md:text-left font-kagitingan">
            Ready to be a part of Techtrix?
          </h1>
          <Link
            href="/"
            className="mt-4 md:mt-0 border border-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Coming Soon
          </Link>
        </div>
        <div className="relative flex justify-center items-center">
          <SVGIcon 
            iconName="logo" 
            className="block w-[380px] h-[380px]" 
          />
          <SVGIcon 
            iconName="techtrix" 
            className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[100px] z-10" 
          />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 text-center">
          {list.map((item, index) => (
            <React.Fragment key={item.title}>
              <Link href={item.link} target="_blank" rel="noopener noreferrer">
                <span className="hover:underline text-2xl font-bold font-kagitingan">{item.title}</span>
              </Link>
              {index !== list.length - 1 && (
                <span className="text-2xl font-bold font-kagitingan"> | </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-center mt-6">
          <p className="mb-4 text-xl font-semibold">Follow us</p>
          <div className="flex justify-center space-x-4">
            {[
              { icon: <FaInstagram className="w-5 h-5" />, href: "https://www.instagram.com/techtrix_official" },
              { icon: <FaFacebook className="w-5 h-5" />, href: "https://www.facebook.com/techtrix.rcciit" },
              { icon: <FaLinkedinIn className="w-5 h-5" />, href: "https://linkedin.com/company/techtrix-rcciit" },
            ].map((social, index) => (
              <Link
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                href={social.href}
                className="p-2 border border-white rounded-full hover:bg-gray-800 transition"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
