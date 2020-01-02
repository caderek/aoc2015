import { readInput } from "../../utils/index"

const compute = (source: string, regA = 0) => {
  const program = source.split("\n").map((line) => {
    const instruction: (string | number)[] = line.split(" ")

    if (instruction[0] === "jmp") {
      instruction[1] = Number(instruction[1])
    }

    if (instruction[0] === "jie" || instruction[0] === "jio") {
      instruction[1] = (instruction[1] as string).slice(0, -1)
      instruction[2] = Number(instruction[2])
    }

    return instruction
  })

  const registers = { a: regA, b: 0 }
  let pointer = 0

  while (program[pointer] !== undefined) {
    const [op, x, y] = program[pointer]

    switch (op) {
      case "hlf": {
        registers[x] = registers[x] / 2
        pointer++
        break
      }

      case "tpl": {
        registers[x] *= 3
        pointer++
        break
      }

      case "inc": {
        registers[x]++
        pointer++
        break
      }

      case "jmp": {
        pointer += x as number
        break
      }

      case "jie": {
        pointer += registers[x] % 2 === 0 ? (y as number) : 1
        break
      }

      case "jio": {
        pointer += registers[x] === 1 ? (y as number) : 1
        break
      }
    }
  }

  return registers.b
}

const goA = (rawInput: string) => {
  return compute(rawInput)
}

const goB = (rawInput: string) => {
  return compute(rawInput, 1)
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 307
console.log("Solution to part 2:", resultB) // -> 160
