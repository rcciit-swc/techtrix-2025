import Link from "next/link";
import { FaInstagram, FaFacebook, FaGoogle } from "react-icons/fa";
import SVGIcon from "../SVGIcon";

export default function Footer() {
  const list = ["Events", "Team", "Sponsorship", "Contact Us"];
  return (
    <footer className="relative bg-black text-white py-8 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://s3-alpha-sig.figma.com/img/42c8/ad88/1017c056d7a1fba3474450df3754201e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FqWPFVNyWngDHFa4EXdRHRTaDprUVrYac5bGBS5MO-brHtQXZZD638v8dgtNUia1PKfeYjtHmpZAq~2ys92RJc0qOukf7v~WGRPhJxem5LsVncewqexjLjHE1z0qSiDPoDJ-JYZ5FHifDgTy1OsmsIV1iVKenqAJfT-9myFw6WECmEkDYoRCR-ZChGMpjSM7AS4mk4eOqI0CsJrO4CgrnULF43-~CBlUNDrb3OzEar0G0oNxg82PYoTo7aSt-s2jpEFHQKqke4q6JQl4oh-VoYRvooVQ87HBBHwJA0cocpwkqcSIerTs5DoDG9LhizNTNy5FcyexL5FLiffvYaThGQ__')] bg-cover bg-center filter blur-2xl opacity-40" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl md:text-5xl font-bold text-center md:text-left font-kagitingan">
            Ready to be a part of Techtrix?
          </h1>
          <Link
            href=""
            className="mt-4 md:mt-0 border border-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Register Now
          </Link>
        </div>
        <div className="flex justify-center">
          <SVGIcon iconName="logo" className="w-56 h-56" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
          {list.map((item) => (
            <Link key={item} href="">
              <span className="hover:underline text-2xl font-bold">{item}</span>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <p className="mb-4 text-xl font-semibold">Follow us</p>
          <div className="flex justify-center space-x-4">
            {[
              { icon: <FaInstagram className="w-5 h-5" />, href: "" },
              { icon: <FaFacebook className="w-5 h-5" />, href: "" },
              { icon: <FaGoogle className="w-5 h-5" />, href: "" },
            ].map((social, index) => (
              <Link
                key={index}
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
