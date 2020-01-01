import { test, readInput, R } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").chain((lines: string[]) => {
    const substitutions = lines.slice(0, -2).map((item) => item.split(" => "))
    const molecule = lines.slice(-1)[0]

    return { substitutions, molecule }
  })

const goA = (rawInput: string) => {
  const { substitutions, molecule } = prepareInput(rawInput)
  const newMolecules = new Set()

  substitutions.forEach(([original, replacement]) => {
    let startIndex = 0

    while (true) {
      const index = molecule.indexOf(original, startIndex)

      if (index !== -1) {
        const newMolecule =
          molecule.slice(0, index) +
          replacement +
          molecule.slice(index + original.length)

        newMolecules.add(newMolecule)
        startIndex = index + original.length
      } else {
        break
      }
    }
  })

  return newMolecules.size
}

const tokenize = (molecule: string) => {
  return molecule.split("").reduce((elements, next) => {
    if (next.toUpperCase() === next) {
      elements.push(next)
    } else {
      elements[elements.length - 1] += next
    }

    return elements
  }, [])
}

const goB = (rawInput: string) => {
  const { substitutions, molecule } = prepareInput(rawInput)

  const right = substitutions.map((x) => tokenize(x[1]))
  const left = substitutions.map((x) => x[0])

  const rightOnly = R.difference([...new Set(right.flat())], [...new Set(left)])

  const tokenized = tokenize(molecule)
  const innerElement = "Y"

  const counts = rightOnly.map(
    (x) =>
      tokenized.filter((el) => el === x).length * (x === innerElement ? 2 : 1),
  )

  return tokenized.length - counts.reduce((a, b) => a + b)
}

/* Tests */

test(
  goA(
    `
H => HO
H => OH
O => HH

HOH
  `.trim(),
  ),
  4,
)

test(
  goA(
    `
H => HO
H => OH
O => HH

HOHOHO
  `.trim(),
  ),
  7,
)

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 509
console.log("Solution to part 2:", resultB) // -> 195
