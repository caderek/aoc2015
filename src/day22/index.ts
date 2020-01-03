import {
  test,
  readInput,
  arr,
  com,
  mul,
  dis,
  math,
  R,
  graph,
  log,
  equal,
  gen,
} from "../../utils/index"
import { WSA_E_NO_MORE } from "constants"

const prepareInput = (rawInput: string) =>
  rawInput
    .match(/\d+/g)
    .map(Number)
    .chain(([hp, damage]) => ({ hp, damage }))

const spells = [
  { cost: 53, damage: 4, armor: 0, lasts: 0, hp: 0, mana: 0 },
  { cost: 73, damage: 2, armor: 0, lasts: 0, hp: 2, mana: 0 },
  { cost: 113, damage: 0, armor: 7, lasts: 6, hp: 0, mana: 0 },
  { cost: 173, damage: 3, armor: 0, lasts: 6, hp: 0, mana: 0 },
  { cost: 229, damage: 0, armor: 0, lasts: 5, hp: 0, mana: 101 },
]

log([...gen.cartesian(...R.repeat(spells, 2))].length)

const goA = (rawInput: string) => {
  const boss = prepareInput(rawInput)
  const player = { hp: 50, mana: 500, damage: 0, armor: 0 }

  const costs = { won: [], lost: [] }
  let len = 1

  while (costs.won.length === 0) {
    for (const scenario of gen.cartesian(...R.repeat(spells, len))) {
      console.log(scenario)
    }

    len++
  }
  console.log({ spells, player, boss })

  return
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
