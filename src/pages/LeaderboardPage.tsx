import { getHighscores } from "@/lib/scores";

export default function LeaderboardPage() {
  const highscores = getHighscores();

  console.log(highscores);

  const entries = Object.entries(highscores).sort((scoreArr1, scoreArr2) => {
    const score1 = Number(scoreArr1[1]);
    const score2 = Number(scoreArr2[1]);

    return score1 > score2 ? -1 : 1;
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-4xl p-10">Palabras Encadenadas: Leaderboard</h1>
      <table className="flex overflow-y-auto h-100">
        <thead>
          {entries.length > 0 &&
            entries.map((arr) => {
              const name = arr[0];
              const score = arr[1];
              return (
                <tr key={name} className="flex gap-4 text-2xl">
                  <th>{name}</th>
                  <td>{score}</td>
                </tr>
              );
            })}
          {entries.length === 0 && (
            <p>
              No hay resultados de partidas jugadas. ¡Juega una para ver tu
              puntaje aquí!
            </p>
          )}
        </thead>
      </table>
    </div>
  );
}
