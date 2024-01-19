import { Grid } from '@react-three/drei'

const options = {
  gridSize: [30, 30],
  cellSize: 1.0,
  cellThickness: 1.0,
  cellColor: '#707070',
  sectionSize: 5.0,
  sectionThickness: 1.5,
  sectionColor: '#1e1e1e', // '#00ffd9',
  fadeDistance: 300,
  fadeStrength: 1,
  followCamera: false,
  infiniteGrid: true,
}

export default function GridHelper() {
  return <Grid {...options} />
}
