import styles from "./About.module.css"
import Spline from "@splinetool/react-spline/next"
import SVGIcon from "../SVGIcon"

export default function About() {
  return (
    <main className="relative h-auto w-full bg-black overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <Spline className="w-full h-full opacity-50" scene="https://prod.spline.design/YwsksritFlzusrK3/scene.splinecode" />
      </div>

      <div className="relative z-10 min-h-screen container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold font-kagitingan text-white text-center pt-12 pb-16">ABOUT</h1>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className={`hidden w-full h-[500px] md:w-1/2 md:flex justify-center`}>
            {/* <Spline
              className="relative w-full h-full"
              scene="https://prod.spline.design/ipux7BeSvmPX34R1/scene.splinecode"
            /> */}
            <Spline
              className="relative w-full min-h-full"
              scene="https://prod.spline.design/zhH6lHBVbRtifsW7/scene.splinecode"
            />
          </div>


          <div className="md:w-1/2 w-full text-center">
            <p className="text-white/90 text-lg md:text-2xl font-semibold leading-relaxed font-alexandria">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in arcu suscipit,
              ultricies eros at, lacinia orci. Cras ultricies tristique finibus. Vestibulum
              sollicitudin elementum urna, eget pharetra dui dapibus nec. Ut gravida, enim eget
              rutrum lacinia, sem massa vestibulum arcu, eget tristique orci sapien et ex.
              Quisque eget dapibus mi, a gravida eros. Vestibulum lectus felis, pharetra nec
              velit at, laoreet aliquam eros. Integer ultricies lobortis porta.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in arcu suscipit,
              ultricies eros at, lacinia orci. Cras ultricies tristique finibus. Vestibulum
              sollicitudin elementum urna, eget pharetra dui dapibus nec. Ut gravida, enim eget
              rutrum lacinia, sem massa vestibulum arcu, eget tristique orci sapien et ex.
              Quisque eget dapibus mi, a gravida eros. Vestibulum lectus felis, pharetra nec
              velit at, laoreet aliquam eros. Integer ultricies lobortis porta.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}