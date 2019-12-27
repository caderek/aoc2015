import { readInput } from "../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => x.split("x").map(Number))

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return input.reduce((sum, [l, w, h]) => {
    const [minA, minB] = [l, w, h].sort((a, b) => a - b)

    return 2 * l * w + 2 * w * h + 2 * h * l + minA * minB + sum
  }, 0)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return input.reduce((sum, [l, w, h]) => {
    const [minA, minB] = [l, w, h].sort((a, b) => a - b)

    return sum + minA * 2 + minB * 2 + l * w * h
  }, 0)
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 1586300
console.log("Solution to part 2:", resultB) // -> 3737498
