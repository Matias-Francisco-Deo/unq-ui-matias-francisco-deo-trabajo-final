import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="bg-black text-white min-h-dvh font-mono flex ">
      <div className="border border-white w-full flex text-2xl flex-row items-center px-30 sticky top-0 h-1/3">
        <button>Home</button>
      </div>
      <Outlet />
    </div>
  );
}
