export const ItemTypes = {
    TILE: 'tile',
}

const vals = [0, 64, 128, 192, 255]
let colors = []
for (let i = 0; i < 125; i++) {
  let new_color = []
  let __i = i
  for (let j = 0; j < 3; ++j) {
    new_color.push(vals[__i%5])
    __i = Math.floor(__i/5)
  }
  if (Math.max(...new_color) - Math.min(...new_color) < 128) {
    continue
  } else {
    colors.push(new_color)
  }
}

export const COLORS = [
  ...colors
]

export const SIM_CONST = 10
