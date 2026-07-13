import { Header } from "@/components/ui/Header";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="bg-black z-40 text-white min-h-dvh flex flex-col font-deltarune">
      <Header />
      <div className="flex flex-row flex-1 items-center ">
        <div className="w-full border-white max-h-[85dvh] max-w-300 aspect-3/4 border p-4 mx-auto min-w-150 flex items-center flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
