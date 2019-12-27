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
} from "../utils/index"
import { createHash } from "crypto"

const prepareInput = (rawInput: string) => rawInput

const goA = (rawInput: string) => {
  let i = 1

  while (i++) {
    const hash = createHash("md5")
      .update(rawInput + i)
      .digest("hex")

    if (hash.startsWith("00000")) {
      return i
    }
  }
}

const goB = (rawInput: string) => {
  let i = 1

  while (i++) {
    const hash = createHash("md5")
      .update(rawInput + i)
      .digest("hex")

    if (hash.startsWith("000000")) {
      return i
    }
  }
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 346386
console.log("Solution to part 2:", resultB) // -> 9958218
