import { readInput, math } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const chunks = line.split(" ")
    const from = chunks[chunks.length - 3].split(",").map(Number)
    const to = chunks[chunks.length - 1].split(",").map(Number)
    const type = line.startsWith("turn on")
      ? "on"
      : line.startsWith("turn of")
      ? "off"
      : "toggle"

    return { type, from, to }
  })

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const board = math.matrix(math.zeros([1000, 1000]))

  input.forEach(({ type, from, to }) => {
    const replacement =
      type === "on"
        ? math.ones([to[1] - from[1] + 1, to[0] - from[0] + 1])
        : type === "off"
        ? math.zeros([to[1] - from[1] + 1, to[0] - from[0] + 1])
        : math
            .subset(
              board,
              math.index(
                math.range(from[1], to[1] + 1),
                math.range(from[0], to[0] + 1),
              ),
            )
            // @ts-ignore
            .map((x) => (x === 0 ? 1 : 0))

    board.subset(
      math.index(
        math.range(from[1], to[1] + 1),
        math.range(from[0], to[0] + 1),
      ),
      replacement,
    )
  })

  let lit = 0

  board.forEach((x) => {
    if (x === 1) {
      lit++
    }
  })

  return lit
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const board = math.matrix(math.zeros([1000, 1000]))

  input.forEach(({ type, from, to }) => {
    const replacement = math
      .subset(
        board,
        math.index(
          math.range(from[1], to[1] + 1),
          math.range(from[0], to[0] + 1),
        ),
      )
      // @ts-ignore
      .map((x) =>
        type === "on" ? x + 1 : type === "off" ? Math.max(x - 1, 0) : x + 2,
      )

    board.subset(
      math.index(
        math.range(from[1], to[1] + 1),
        math.range(from[0], to[0] + 1),
      ),
      replacement,
    )
  })

  let brightness = 0

  board.forEach((x) => {
    brightness += x
  })

  return brightness
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 569999
console.log("Solution to part 2:", resultB) // -> 17836115
