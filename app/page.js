import Image from "next/image";
import Weathercomp from "./Weathercomp";
import bg from './bg.jpg'

export default async function Home() {
  return (
    <main className="bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 bg-cover w-screen h-screen">
      
      <Weathercomp />
      <div className=" backdrop-blur-sm bg-black/30 fixed bottom-0 w-screen p-4 text-center text-cyan-200">
        © 2023 Copyright:
        <a
          className="text-cyan-100 "
          href="https://tailwind-elements.com/"
        >
          WEATHERx
        </a>
      </div>
    </main>
  );
}
