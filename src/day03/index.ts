import {
  test,
  readInput,
  arr,
  com,
  mul,
  dis,
  math,
  iter,
  R,
  graph,
  log,
} from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split("")

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const visited = new Set()
  let prev = [0, 0]
  visited.add("0,0")

  const inc = {
    ">": [1, 0],
    "<": [-1, 0],
    "^": [0, -1],
    v: [0, 1],
  }

  input.forEach((dir) => {
    const next = arr.zipWith_((a: number, b: number) => a + b, inc[dir], prev)
    visited.add(next.join(","))
    prev = next
  })

  return visited.size
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const santa = input.filter((_, i) => i % 2 === 0)
  const robot = input.filter((_, i) => i % 2 !== 0)
  const visited = new Set()
  visited.add("0,0")

  const inc = {
    ">": [1, 0],
    "<": [-1, 0],
    "^": [0, -1],
    v: [0, 1],
  }

  let prevSanta = [0, 0]

  santa.forEach((dir) => {
    const next = arr.zipWith_(
      (a: number, b: number) => a + b,
      inc[dir],
      prevSanta,
    )
    visited.add(next.join(","))
    prevSanta = next
  })

  let prevRobot = [0, 0]

  robot.forEach((dir) => {
    const next = arr.zipWith_(
      (a: number, b: number) => a + b,
      inc[dir],
      prevRobot,
    )
    visited.add(next.join(","))
    prevRobot = next
  })

  return visited.size
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 2565
console.log("Solution to part 2:", resultB) // -> 2639
