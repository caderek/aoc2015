import { readInput, R, numSys } from "../utils/index"

const alphaNum = numSys("abcdefghijklmnopqrstuwvxyz")

const getNewPass = (oldPass) => {
  const pass = alphaNum(oldPass)

  while (true) {
    const newPass = pass.increment()
    const raw = newPass.getRaw()

    if (
      !raw.includes(8) &&
      !raw.includes(11) &&
      !raw.includes(14) &&
      new Set(
        R.aperture(2, raw)
          .filter(([a, b]) => a === b)
          .map(String),
      ).size >= 2 &&
      R.aperture(3, raw).find(([a, b, c]) => b - a === 1 && c - b === 1) !==
        undefined
    ) {
      return newPass.get()
    }
  }
}

const goA = (input: string) => {
  return getNewPass(input)
}

const goB = (input: string) => {
  return getNewPass(getNewPass(input))
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> cqjxxyzz
console.log("Solution to part 2:", resultB) // -> cqkaabcc
