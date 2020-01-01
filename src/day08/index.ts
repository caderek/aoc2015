import { readInput } from "../../utils/index"

const goA = (rawInput: string) => {
  const input = rawInput.split("\n")

  const original = input.map((x) => x.length).reduce((a, b) => a + b)

  const escaped = input
    .map((x) => x.slice(1, -1).replace(/\\(x..|"|\\)/g, "_").length)
    .reduce((a, b) => a + b)

  return original - escaped
}

const goB = (rawInput: string) => {
  const input = rawInput.split("\n")

  const original = input.map((x) => x.length).reduce((a, b) => a + b)

  const encoded = input
    .map((x) => x.replace(/("|\\)/g, "__").length + 2)
    .reduce((a, b) => a + b)

  return encoded - original
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
