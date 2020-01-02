import { readInput, gen } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map(Number)
    .sort((a, b) => b - a)

const minSize = (descArr: number[], target: number) => {
  let size = 0
  let sum = 0

  for (const item of descArr) {
    sum += item
    size++
    if (sum >= target) {
      return size
    }
  }
}

const go = (rawInput: string, groups: number) => {
  const input = prepareInput(rawInput)
  const target = input.reduce((a, b) => a + b) / groups

  let minQuantumEntanglement = Infinity
  let size = minSize(input, target)

  while (minQuantumEntanglement === Infinity) {
    for (const x of gen.combination(input, size)) {
      if (x.reduce((a, b) => a + b) === target) {
        const quantumEntanglement = x.reduce((a, b) => a * b)

        minQuantumEntanglement = Math.min(
          quantumEntanglement,
          minQuantumEntanglement,
        )
      }
    }
    size++
  }

  return minQuantumEntanglement
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = go(input, 3)
const resultB = go(input, 4)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 11266889531
console.log("Solution to part 2:", resultB) // -> 77387711
