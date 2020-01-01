import { readInput, grid } from "../../utils/index"

const goA = (rawInput: string) => {
  let g = grid.from(rawInput)

  for (let i = 0; i < 100; i++) {
    const temp = grid.create(g.width, g.height)

    for (let y = 0; y < g.width; y++) {
      for (let x = 0; x < g.height; x++) {
        const neighbors = grid
          .neighborsWithDiagonals(x, y, g)
          .filter((n) => n === "#").length

        const cell = g[y][x]

        temp[y][x] =
          (cell === "#" && (neighbors === 2 || neighbors === 3)) ||
          (cell === "." && neighbors === 3)
            ? "#"
            : "."
      }
    }

    g = temp
  }

  return g.flat().filter((x) => x === "#").length
}

const goB = (rawInput: string) => {
  let g = grid.from(rawInput)
  g[0][0] = "#"
  g[0][99] = "#"
  g[99][0] = "#"
  g[99][99] = "#"

  for (let i = 0; i < 100; i++) {
    const temp = grid.create(g.width, g.height)

    for (let y = 0; y < g.width; y++) {
      for (let x = 0; x < g.height; x++) {
        const neighbors = grid
          .neighborsWithDiagonals(x, y, g)
          .filter((n) => n === "#").length

        const cell = g[y][x]

        temp[y][x] =
          (cell === "#" && (neighbors === 2 || neighbors === 3)) ||
          (cell === "." && neighbors === 3)
            ? "#"
            : "."
      }
    }

    temp[0][0] = "#"
    temp[0][99] = "#"
    temp[99][0] = "#"
    temp[99][99] = "#"
    g = temp
  }

  return g.flat().filter((x) => x === "#").length
}

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 814
console.log("Solution to part 2:", resultB) // -> 924
