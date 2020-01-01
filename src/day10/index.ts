import { readInput } from "../../utils/index"

const go = (input: string, repeats: number) => {
  let current = input.split("").map(Number)

  for (let i = 0; i < repeats; i++) {
    const temp = []
    let times = 0
    let prev = current[0]

    current.forEach((x, index) => {
      if (x === prev) {
        times++
      } else {
        temp.push(times)
        temp.push(prev)
        times = 1
        prev = x
      }

      if (index === current.length - 1) {
        temp.push(times)
        temp.push(prev)
      }
    })

    current = temp
  }

  return current.length
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = go(input, 40)
const resultB = go(input, 50)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 252594
console.log("Solution to part 2:", resultB) // -> 3579328
