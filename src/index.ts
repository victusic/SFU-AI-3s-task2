const limit = 100 //дальность обзора корабля (размер плоскости)

function moveUntilMatch(
  objectCoordinates: [number, number],
  targetCoordinates: [number, number][],
  typeCoordinate: number, //x или y
  isForward: boolean,
): number {
  let iterations = 0

  while (!targetCoordinates.some((coord) => coord[0] === objectCoordinates[0] && coord[1] === objectCoordinates[1])) {
    {
      isForward ? objectCoordinates[typeCoordinate]++ : objectCoordinates[typeCoordinate]--
    }
    iterations++
    if (iterations >= 100) return Infinity
  }

  return iterations
}

// Пример использования функции
const objectCoordinates: [number, number] = [2, 1] // Начальные координаты объекта
const targetCoordinates: [number, number][] = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
] // Набор целевых координат

const rightMove = moveUntilMatch([...objectCoordinates], targetCoordinates, 0, true)
const leftMove = moveUntilMatch([...objectCoordinates], targetCoordinates, 0, false)
const topMove = moveUntilMatch([...objectCoordinates], targetCoordinates, 1, true)
const bottomMove = moveUntilMatch([...objectCoordinates], targetCoordinates, 1, false)

console.log(`Лево: ${leftMove}`)
console.log(`Право: ${rightMove}`)
console.log(`Верх: ${topMove}`)
console.log(`Низ: ${bottomMove}`)
