import { Game } from "@/components/game/Game";

export default function GamePage() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-4xl p-10">Palabras Encadenadas</h1>
      <Game />
    </div>
  );
}
