import { readInput, arr, R } from "../../utils/index"
import { getFactors } from "primes-and-factors"

const prepareInput = (rawInput: string) => Number(rawInput)

const divSum = (num) => {
  return R.groupWith(R.equals, getFactors(num))
    .map((factor) =>
      factor.reduce(
        (sum: number, x: number, i: number) => sum + x ** (i + 1),
        1,
      ),
    )
    .reduce((a: number, b: number) => a * b, 1)
}

const divisors = (num) => {
  if (num < 2) {
    return []
  }

  const root = Math.floor(Math.sqrt(num))
  const lows = arr.range_(1, root + 1).filter((x) => num % x === 0)

  return lows.concat(lows.map((x) => num / x))
}

const goA = (rawInput: string) => {
  const target = prepareInput(rawInput)

  let presents = 0
  let house = 0

  while (presents < target) {
    house++
    let sum = divSum(house) as number

    presents = sum * 10
  }

  return house
}

const goB = (rawInput: string) => {
  const target = prepareInput(rawInput)

  let presents = 0
  let house = 0

  while (presents < target) {
    house++
    const minDivisor = Math.floor(house / 50)
    const sum = divisors(house)
      .filter((x) => x >= minDivisor)
      .reduce((a, b) => a + b, 0)

    presents = sum * 11
  }

  return house
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 786240
console.log("Solution to part 2:", resultB) // -> 831600
