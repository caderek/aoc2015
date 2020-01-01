import { readInput, gen } from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split("\n").map(Number)

const goA = (rawInput: string) => {
  const containers = prepareInput(rawInput)
  const sizes = []
  const target = 150

  for (let i = 4; i < containers.length; i++) {
    for (const x of gen.combination(containers, i)) {
      if (x.reduce((a, b) => a + b) === target) {
        sizes.push(x.length)
      }
    }
  }

  return sizes
}

const goB = (sizes) => {
  const min = Math.min(...sizes)
  return sizes.filter((x) => x === min).length
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(resultA)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA.length) // -> 654
console.log("Solution to part 2:", resultB) // -> 57
