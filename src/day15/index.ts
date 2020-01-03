import { readInput, arr, gen } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.match(/-?\d+/g).map(Number))

const go = (rawInput: string, calCond = (cal: number) => true) => {
  const input = prepareInput(rawInput)
  let max = 0

  for (const [a, b, c] of gen.baseN(arr.range_(0, 101), 3)) {
    const d = 100 - (a + b + c)

    if (d < 0) {
      continue
    }

    const spoons = [a, b, c, d]
    const ingredients = [0, 0, 0, 0, 0]

    for (let i = 0; i < 4; i++) {
      input[i].forEach((x, index) => {
        ingredients[index] += x * spoons[i]
      })
    }

    const score = ingredients
      .slice(0, -1)
      .map((x) => (x > 0 ? x : 0))
      .reduce((a, b) => a * b)

    max = score > max && calCond(ingredients[4]) ? score : max
  }

  return max
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = go(input)
const resultB = go(input, (cal) => cal === 500)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 18965440
console.log("Solution to part 2:", resultB) // -> 15862900
