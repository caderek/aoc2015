import { readInput, math } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const chunks = line.split(" ")
    const from = chunks[chunks.length - 3].split(",").map(Number)
    const to = chunks[chunks.length - 1].split(",").map(Number)
    const type = line.startsWith("turn on")
      ? "on"
      : line.startsWith("turn of")
      ? "off"
      : "toggle"

    return { type, from, to }
  })

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const board = math.zeros([1000, 1000]) as number[][]

  input.forEach(({ type, from, to }) => {
    for (let y = from[1]; y <= to[1]; y++) {
      for (let x = from[0]; x <= to[0]; x++) {
        board[y][x] =
          type === "on" ? 1 : type === "off" ? 0 : board[y][x] === 1 ? 0 : 1
      }
    }
  })

  return board.flat().reduce((a, b) => a + b)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const board = math.zeros([1000, 1000]) as number[][]

  input.forEach(({ type, from, to }) => {
    for (let y = from[1]; y <= to[1]; y++) {
      for (let x = from[0]; x <= to[0]; x++) {
        board[y][x] +=
          type === "on" ? 1 : type === "off" ? (board[y][x] === 0 ? 0 : -1) : 2
      }
    }
  })

  return board.flat().reduce((a, b) => a + b)
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 569999
console.log("Solution to part 2:", resultB) // -> 17836115
