import { limit, objectCoordinates, targetCoordinates } from './data'
import { MoveResult } from './types'

function sortMovesByLength(moves: MoveResult[]): { shortest: MoveResult[]; longest: MoveResult[] } {
  const sortedMoves = [...moves].sort((a, b) => a.length - b.length)

  const shortestLength = sortedMoves[0].length
  const shortestMoves = sortedMoves.filter((move) => move.length === shortestLength)

  const longestLength = sortedMoves[sortedMoves.length - 1].length
  const longestMoves = sortedMoves.filter((move) => move.length === longestLength)

  return {
    shortest: shortestMoves,
    longest: longestMoves,
  }
}

function moveUntilMatch(
  objectCoordinates: [number, number],
  targetCoordinates: [number, number][],
  typeCoordinate: number, //x(0) или y(1)
  isForward: boolean,
): number {
  let iterations = 0

  while (!targetCoordinates.some((coord) => coord[0] === objectCoordinates[0] && coord[1] === objectCoordinates[1])) {
    {
      isForward ? objectCoordinates[typeCoordinate]++ : objectCoordinates[typeCoordinate]--
    }
    iterations++
    if (iterations >= limit) return Infinity
  }

  return iterations
}

const moves: MoveResult[] = [
  { direction: 'West-Запад', length: moveUntilMatch([...objectCoordinates], targetCoordinates, 0, true) },
  { direction: 'East-Восток', length: moveUntilMatch([...objectCoordinates], targetCoordinates, 0, false) },
  { direction: 'North-Север', length: moveUntilMatch([...objectCoordinates], targetCoordinates, 1, true) },
  { direction: 'South-Юг', length: moveUntilMatch([...objectCoordinates], targetCoordinates, 1, false) },
]

const sortedMoves = sortMovesByLength(moves)

console.log('Самый короткий путь(пути):')
sortedMoves.shortest.map((move) =>
  console.log(`${move.direction} - шагов: ${move.length === Infinity ? 'бесконечное кол-во' : move.length}`),
)

console.log('\nСамый длинный путь(пути):')
sortedMoves.longest.map((move) =>
  console.log(`${move.direction} - шагов: ${move.length === Infinity ? 'бесконечное кол-во' : move.length}`),
)
