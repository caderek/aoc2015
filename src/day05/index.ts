import { readInput } from "../utils/index"

const goA = (input: string) => {
  return input
    .split("\n")
    .filter(
      (x) =>
        (x.match(/[aeiou]/g) || []).length >= 3 &&
        (x.match(/ab|cd|pq|xy/g) || []).length === 0 &&
        (x.match(/(.)\1+/g) || []).length >= 1,
    ).length
}

const goB = (input: string) => {
  return input
    .split("\n")
    .filter(
      (x) =>
        x.match(/(.)(.).*\1\2/g) !== null && x.match(/(.).{1}\1/g) !== null,
    ).length
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
