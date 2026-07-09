import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="bg-black z-40 text-white min-h-dvh flex flex-col font-deltarune">
      <div className="border border-white w-full flex text-2xl flex-row items-center px-30 sticky top-0 h-1/3">
        <button>Home</button>
      </div>
      <div className="flex flex-row flex-1 items-center ">
        {/* <aside className="border-white sticky top-0 flex h-dvh w-100 flex-col gap-4 border-r p-4"></aside> */}
        <div className="w-full border-white max-h-[85dvh] max-w-300 aspect-3/4 border p-4 mx-auto min-w-150 flex items-center flex-1">
          <Outlet />
        </div>
        {/* <aside className="border-white sticky top-0 flex h-dvh w-100 flex-col gap-4 border-l p-4"></aside> */}
      </div>
    </div>
  );
}
