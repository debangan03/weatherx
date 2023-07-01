import Weathercomp from "./Weathercomp";

export default async function Home() {
  return (
    <main
      className="bg-cover bg-center h-screen w-screen"
      style={{
        backgroundImage: "url('./bg.jpg')",
      }}
    >
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
