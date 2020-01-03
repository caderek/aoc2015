import { readInput, R, gen } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [from, _, to, __, dis] = line.split(" ")

    return { from, to, dis: Number(dis) }
  })

const go = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const places = [...new Set(input.map((x) => [x.from, x.to]).flat())]
  const edges = Object.fromEntries(
    input
      .map(({ from, to, dis }) => [
        [`${from}:${to}`, dis],
        [`${to}:${from}`, dis],
      ])
      .flat(),
  )

  const distances = []

  for (const path of gen.permutation(places)) {
    distances.push(
      R.aperture(2, path)
        .map(([from, to]) => edges[`${from}:${to}`])
        .reduce((a, b) => a + b),
    )
  }

  return distances
}

/* Results */

const input = readInput()

console.time("Time")
const distances = go(input)
const resultA = Math.min(...distances)
const resultB = Math.max(...distances)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 717
console.log("Solution to part 2:", resultB) // -> 909
