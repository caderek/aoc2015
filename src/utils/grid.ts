class Grid {
  raw: any[][]
  width: number
  height: number

  constructor(w?: number, h?: number, fill: any = null) {
    if (w !== undefined && h !== undefined) {
      this.raw = Array.from({ length: h }, () =>
        Array.from({ length: w }, () => fill),
      )
      this.width = w
      this.height = h
    }

    return this
  }

  from(definition: string, mapper?: Function) {
    this.raw = definition.split("\n").map((line) => line.split(""))
    this.height = this.raw.length
    this.width = this.raw[0].length

    return this
  }

  neighborsWithDiagonals(x: number, y: number) {
    return [
      this.raw[y - 1]?.[x],
      this.raw[y - 1]?.[x + 1],
      this.raw[y][x + 1],
      this.raw[y + 1]?.[x + 1],
      this.raw[y + 1]?.[x],
      this.raw[y + 1]?.[x - 1],
      this.raw[y][x - 1],
      this.raw[y - 1]?.[x - 1],
    ].filter((n) => n !== undefined)
  }

  neighbors(x: number, y: number) {
    return [
      this.raw[y - 1]?.[x],
      this.raw[y][x + 1],
      this.raw[y + 1]?.[x],
      this.raw[y][x - 1],
    ].filter((n) => n !== undefined)
  }
}

export default (w?: number, h?: number, fill: any = null) =>
  new Grid(w, h, fill)
