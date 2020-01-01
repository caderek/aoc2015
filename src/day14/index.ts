import { readInput, arr } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => line.split(" "))
    .map((x) => ({
      name: x[0],
      speed: Number(x[3]),
      flyTime: Number(x[6]),
      restTime: Number(x[13]),
    }))

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const maxTime = 2503

  return Math.max(
    ...input.reduce((times, { speed, flyTime, restTime }) => {
      const fullCycles = (maxTime / (flyTime + restTime)) >> 0
      const remainingTime = maxTime % (flyTime + restTime)
      const lastFlightTime = remainingTime > flyTime ? flyTime : remainingTime

      return times.concat((fullCycles * flyTime + lastFlightTime) * speed)
    }, []),
  )
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const maxTime = 2503

  let totalPoints = Array.from({ length: input.length }, () => 0)
  const distances = Array.from({ length: input.length }, () => 0)

  for (let i = 0; i < maxTime; i++) {
    input.forEach(({ name, speed, flyTime, restTime }, index) => {
      const isFlying = i % (flyTime + restTime) < flyTime

      if (isFlying) {
        distances[index] += speed
      }
    })

    const roundWinner = Math.max(...distances)
    const points = distances.map((dis) => (dis === roundWinner ? 1 : 0))

    totalPoints = arr.zipWith_((a, b) => a + b, totalPoints, points)
  }

  return Math.max(...totalPoints)
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 2696
console.log("Solution to part 2:", resultB) // -> 1084
