import { readInput, iter, R } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => line.split(" "))
    .map((x) => [
      x[0],
      x[10].slice(0, -1),
      (x[2] === "gain" ? 1 : -1) * Number(x[3]),
    ])

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const names = [...new Set(input.map((x) => x.slice(0, 2)).flat())]
  const happiness = Object.fromEntries(
    input.map(([l, r, h]) => [`${l}:${r}`, h]),
  ) as { [key: string]: number }

  const results = []

  for (const p of iter.permutations(names)) {
    const result = R.aperture(2, p)
      .concat([[p[p.length - 1], p[0]]])
      .map(([l, r]) => happiness[`${l}:${r}`] + happiness[`${r}:${l}`])
      .reduce((a, b) => a + b)

    results.push(result)
  }

  return Math.max(...results)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const names = [...new Set(input.map((x) => x.slice(0, 2)).flat())]
  const happiness = Object.fromEntries(
    input.map(([l, r, h]) => [`${l}:${r}`, h]),
  ) as { [key: string]: number }

  const results = []

  for (const p of iter.permutations(names)) {
    const result = R.aperture(2, p)
      .map(([l, r]) => happiness[`${l}:${r}`] + happiness[`${r}:${l}`])
      .reduce((a, b) => a + b)

    results.push(result)
  }

  return Math.max(...results)
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 664
console.log("Solution to part 2:", resultB) // -> 640
