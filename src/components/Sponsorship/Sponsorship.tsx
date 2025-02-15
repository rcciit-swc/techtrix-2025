import Link from "next/link"

const Sponsorship = () => {
  return (
    <main className="relative h-full w-full overflow-hidden">
      <div 
        className="absolute left-0 top-0 w-full h-full bg-[url('https://s3-alpha-sig.figma.com/img/c755/a79f/2f141fba9cb14c9de7b6197818b629d7?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MRBKipo-YFSbS7~s~ybsfCOx~T19XBEH6-UDHNP177tiRWh8ZDarmKwoVL09vUa4ytwWNwRSV6ZhYQESt-34~n-ECVUZ~KYJStWs4OlROxVy9qL7xqgXuaaoR5~HglJv7vInMi6DSjDmQympIr4xK9B6vu-yze-Eyf6y6elDnO8g8xHFFIeGYYKdBDUemc~wlmQbLoRpyt3NWQsTZEuxA2LInWonzBy8JkoQiBHgFXEX4gJrRpbiBcoenjeEgZEubuGdHheXY1neAKmXQhQED8Pgr9VyMkSux7RtzXeyoJtiSoP8k4VmJyXaGS~0jv8iwTUwb9hj54ZQuJVUZLLWbg__')] bg-cover"
      />

      <div className="relative z-10 min-h-screen container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between pt-12 lg:pt-24 gap-8">
          <div className="w-full lg:w-1/3">
            <img
              src="https://s3-alpha-sig.figma.com/img/2f9f/c35c/c117bed8d2a3ccd3aba7492484bd31c8?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LNNhpbxbc-enMjj7aMwAOi8TkEEHzwtW8oamkqhh2DRr4-HPf7oDNkdxamJeyEUIZD-mXzMgldUAPWpgBWEFIekJyKXBQVDUCHmh2VnJx2tij0c-6KvVeA7bQvZ27v1BqfxijunDhnV4DoNUQ0sTVZPxidvbmsr96nZVX64GLV5GE1AHIzHI4XHHofZVCLZNSOlKHKJkQZy7WRIieIKyrcMSHaKZQM2TOwKt3VzNbGc3iISkA926rzm-FU-JBoSoY7d3MhF4SlUMKRVHR3~8FyTg-Zk0PKYzBN5z002E4vllhBhdERvS6BvzyyPjc6WZHm1TLvZyHqjobSlbMi2eFw__"
              alt="Crystal"
              className="w-full h-auto max-w-[500px] mx-auto"
              loading="eager"
            />
          </div>
          <div className="lg:w-2/3 w-full text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Interested in sponsoring this event?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#brochure"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Brochure
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Hit us up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Sponsorship