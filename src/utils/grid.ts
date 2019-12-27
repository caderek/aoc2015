const grid = (w, h, fill = null) => {
  return Array.from({ length: h }, () => Array.from({ length: w }, () => fill))
}

export default grid
