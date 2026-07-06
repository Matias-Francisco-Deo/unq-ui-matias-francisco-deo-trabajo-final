import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GamePage() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-4xl p-10">Palabras Encadenadas</h1>
      <div className="size-1/3 flex justify-center gap-20">
        <div className="aspect-rectangle size-1/2 border flex flex-col items-center text-xl py-4 gap-2">
          <label className="text-sm">Palabra anterior:</label>
          <span>Flower man</span>
        </div>
        <div className="aspect-square border text-sm flex flex-col items-center justify-center py-4 gap-2 ">
          <label className="text-sm">Escribe tu palabra:</label>
          <form
            className=" flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Input
              className="w-4/5"
              placeholder="¡Aquí!"
              onChange={(evt) => {
                console.log(evt.target.value.toLowerCase());
                if (evt.target.value.toLowerCase() === "gaster") {
                  window.location.href = "/";
                }
              }}
            ></Input>
            <Button type="submit" className="w-4/5">
              Enviar
            </Button>
          </form>
        </div>
        <div className="aspect-square size-1/2 border text-sm flex flex-col items-center py-4 gap-2">
          <label className="text-sm">Puntaje:</label>
          <label className="text-xl">1227</label>
        </div>
      </div>
    </div>
  );
}
