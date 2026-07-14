import { getHighscores } from "@/lib/scores";

export default function LeaderboardPage() {
  const highscores = getHighscores();

  const entries = Object.entries(highscores)
    .sort((scoreArr1, scoreArr2) => {
      const score1 = Number(scoreArr1[1]);
      const score2 = Number(scoreArr2[1]);

      return score2 - score1;
    })
    .slice(0, 10);

  const hasEntries = entries.length > 0;
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-4xl p-10">Palabras Encadenadas: Leaderboard</h1>
      <div className="grid gap-0 font-bold text-2xl overflow-y-auto h-100">
        <div>
          {hasEntries && (
            <div className="grid grid-cols-2 gap-0 text-2xl pb-4">
              <div>NOMBRE</div>
              <div>PUNTUACION</div>
            </div>
          )}
          {hasEntries &&
            entries.map((arr) => {
              const name = arr[0];
              const score = arr[1];
              return (
                <div key={name} className="grid grid-cols-2 gap-0 text-2xl">
                  <div>{name}</div>
                  <div>{score}</div>
                </div>
              );
            })}
          {!hasEntries && (
            <p>
              No hay resultados de partidas jugadas. ¡Juega una para ver tu
              puntaje aquí!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
