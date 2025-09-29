import Image from "next/image";
import localFont from "next/font/local"
import Link from "next/link";

const psans = localFont({
  src: "./fonts/PublicSans-Bold.ttf",
  variable: "--font-psans",
  weight: "100 900",
});



export default function Home() {
  return (
    <main className="bg-green-50">
      <section className="grid grid-cols-2 h-[93vh]">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className={`text-3xl font-bold ${psans.className}`}>
            The best URL shortner
          </p>
          <p className="px-50 text-center">
            Shorten links an easy way Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia architecto et optio voluptate quam? Odit, perspiciatis.
          </p>
          <div className='flex gap-3'>
            <Link href="/shorten" className='bg-green-500 shadow-lg text-white rounded-lg p-3 py-1 font-bold'><button>Try now</button></Link>
            <Link href="/github" className='bg-green-500 shadow-lg text-white rounded-lg p-3 py-1 font-bold'><button>Github</button></Link>
          </div>
        </div>
        <div className="flex justify-start relative">
          {/*className= "mix-blend-darken" : to mix color to white bg of image */}
          <Image priority={true} src={"/vector.png"} fill={true} alt="vector image" />
        </div>

      </section>

    </main>
  );
}
