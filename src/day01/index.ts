import { readInput } from "../utils/index"

const goA = (input: string) => {
  const left = input.split("").filter((x) => x === "(").length

  return left - (input.length - left)
}

const goB = (input: string) => {
  let sum = 0
  let i = 1

  for (const item of input.split("")) {
    sum += item === "(" ? 1 : -1

    if (sum === -1) {
      return i
    }

    i++
  }
}

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 232
console.log("Solution to part 2:", resultB) // -> 1783
