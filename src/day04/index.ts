import { readInput } from "../../utils/index"
import { createHash } from "crypto"

const go = (input: string, target: string, start = 1) => {
  let i = start

  while (i++) {
    const hash = createHash("md5")
      .update(input + i)
      .digest("hex")

    if (hash.startsWith(target)) {
      return i
    }
  }
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = go(input, "00000")
const resultB = go(input, "000000", resultA)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 346386
console.log("Solution to part 2:", resultB) // -> 9958218
