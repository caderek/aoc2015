import { readInput } from "../../utils/index"

const goA = (rawInput: string) => {
  return rawInput
    .match(/-*\d+/g)
    .map(Number)
    .reduce((a, b) => a + b)
}

const goB = (rawInput: string) => {
  const input = JSON.parse(rawInput)

  const items = []

  const traverse = (item) => {
    if (typeof item === "object") {
      if (Array.isArray(item)) {
        item.forEach(traverse)
      } else if (!Object.values(item).includes("red")) {
        Object.values(item).forEach(traverse)
      }
    } else {
      items.push(item)
    }
  }

  traverse(input)

  return goA(JSON.stringify(items))
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 111754
console.log("Solution to part 2:", resultB) // -> 65402
