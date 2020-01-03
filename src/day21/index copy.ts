import { readInput, arr, gen } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => Number(arr.last_(line.split(" "))))
    .chain(([hp, damage, armor]) => ({ hp, damage, armor }))

const shop = `
Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage+1    25     1       0
Damage+2    50     2       0
Damage+3   100     3       0
Defense+1   20     0       1
Defense+2   40     0       2
Defense+3   80     0       3
`
  .trim()
  .split("\n\n")
  .map((category) => {
    const lines = category.split("\n")
    const categoryName = lines[0]
      .split(" ")[0]
      .trim()
      .slice(0, -1)

    const items = lines
      .slice(1)
      .map((line) => line.split(" ").filter((x) => x.trim().length !== 0))
      .map(([name, cost, damage, armor]) => ({
        name,
        cost: Number(cost),
        damage: Number(damage),
        armor: Number(armor),
      }))

    return [categoryName, items]
  })
  .chain(Object.fromEntries)

const fight = (boss, player) => {
  const playerDamage = Math.max(player.damage - boss.armor, 1)
  const bossDamage = Math.max(boss.damage - player.armor, 1)

  const playerMoves = Math.ceil(boss.hp / playerDamage)
  const bossMoves = Math.ceil(player.hp / bossDamage)

  return playerMoves <= bossMoves
}

const go = (rawInput: string) => {
  const boss = prepareInput(rawInput)

  const variations = gen.cartesian(shop.Weapons, shop.Armor.concat(null), [
    ...shop.Rings,
    null,
    ...gen.clone.combination(shop.Rings, 2),
  ])

  const costs = { won: [], lost: [] }

  for (const item of variations) {
    const equipment = item.filter((x) => x !== null).flat()
    const damage = equipment.reduce((sum, x) => sum + x.damage, 0)
    const armor = equipment.reduce((sum, x) => sum + x.armor, 0)
    const player = { hp: 100, damage, armor }

    const won = fight({ ...boss }, player)

    costs[won ? "won" : "lost"].push(
      equipment.reduce((sum, x) => sum + x.cost, 0),
    )
  }

  return costs
}

/* Results */

const input = readInput()

console.time("Time")
const costs = go(input)
const resultA = Math.min(...costs.won)
const resultB = Math.max(...costs.lost)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 78
console.log("Solution to part 2:", resultB) // -> 148
