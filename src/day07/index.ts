import { test, readInput, math } from "../../utils/index"

const getMem = (mem) => {
  const recur = (x) =>
    Number.isNaN(Number(x))
      ? mem[x] !== undefined
        ? recur(mem[x])
        : mem[x]
      : Number(x)

  return recur
}

const set = (x) => (Number.isNaN(Number(x)) ? x : Number(x))

const calculations = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b,
}

const compute = (source: string, mem = {}) => {
  const program = source.split("\n").map((line) => {
    const chunks = line.split(" ")

    if (chunks.length === 5) {
      return { op: chunks[1], a: chunks[0], b: chunks[2], c: chunks[4] }
    }

    if (chunks.length === 4) {
      return { op: chunks[0], a: chunks[1], c: chunks[3] }
    }

    return { op: "LINK", a: chunks[0], c: chunks[2] }
  })

  const MODULUS = 65536
  const get = getMem(mem)
  const done = new Set()

  while (done.size !== program.length) {
    program.forEach(({ op, a, b, c }, index) => {
      if (done.has(index)) {
        return
      }

      switch (op) {
        case "LINK": {
          mem[c] = set(a)
          done.add(index)
          break
        }

        case "AND":
        case "OR":
        case "LSHIFT":
        case "RSHIFT": {
          const x = get(a)
          const y = get(b)

          if (x !== undefined && y !== undefined) {
            mem[c] = math.mod(calculations[op](x, y), MODULUS)
            done.add(index)
          }
          break
        }

        case "NOT": {
          const x = get(a)

          if (x !== undefined) {
            mem[c] = math.mod(~x, MODULUS)
            done.add(index)
          }
          break
        }
      }
    })
  }

  return mem
}

const goA = (source: string) => {
  const mem = compute(source)

  return getMem(mem)("a")
}

const goB = (source: string) => {
  const mem = compute(source)
  const alteredSource = source.replace("1674", String(getMem(mem)("a")))
  const mem2 = compute(alteredSource)

  return getMem(mem2)("a")
}

/* Tests */

test(
  compute(
    `
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
  `.trim(),
  ),
  {
    d: 72,
    e: 507,
    f: 492,
    g: 114,
    h: 65412,
    i: 65079,
    x: 123,
    y: 456,
  },
)

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 46065
console.log("Solution to part 2:", resultB) // -> 14134
