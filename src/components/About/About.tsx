import styles from "./About.module.css"
import Spline from "@splinetool/react-spline/next"
import SVGIcon from "../SVGIcon"

export default function About() {
  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <Spline className="w-full h-full" scene="https://prod.spline.design/YwsksritFlzusrK3/scene.splinecode" />
      </div>
      
      <div className="relative z-10 min-h-screen container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center pt-12 pb-16">ABOUT</h1>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
          <div className={`hidden w-full md:w-1/3 lg:flex justify-center ${styles.floatingIcon}`}>
            <SVGIcon 
              iconName="stars" 
              className="w-[200px] h-[200px] md:w-[500px] md:h-[500px]" 
            />
          </div>
          

          <div className="w-full md:w-3/5 text-center lg:text-left">
            <p className="text-white/90 text-lg md:text-2xl font-semibold leading-relaxed">
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