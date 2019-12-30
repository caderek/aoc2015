import { readInput, equal } from "../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => eval(`({${line.slice(line.match(/^Sue \d+:/)[0].length)}})`))

const detected = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return (
    input.findIndex((item) => equal(detected, { ...detected, ...item })) + 1
  )
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return (
    input.findIndex((item) => {
      for (const key in item) {
        if (key === "cats" || key === "trees") {
          if (item[key] <= detected[key]) {
            return false
          }
        } else if (key === "pomeranians" || key === "goldfish") {
          if (item[key] >= detected[key]) {
            return false
          }
        } else if (item[key] !== detected[key]) {
          return false
        }
      }

      return true
    }) + 1
  )
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 373
console.log("Solution to part 2:", resultB) // -> 260
