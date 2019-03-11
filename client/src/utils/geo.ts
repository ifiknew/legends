import * as Matter from 'matter-js'
const { Engine, Render, World, Bodies, MouseConstraint, Body, Vector } =  Matter
const GEO = {
  findNearest: (target: Matter.Body, list: Array<Matter.Body> = []) => {
    let minDis = Number.MAX_VALUE
    let ans = 0
    for (let index = 0; index < list.length; index++) {
      const disV = Vector.sub(target.position, list[index].position)
      const dis = Vector.magnitude(disV)
      if (dis < minDis) {
        minDis = dis
        ans = index
      }
    }
    return ans
  },
  angle: (x: Matter.Body, y: Matter.Body) => Vector.angle(x.position, y.position)
}

export default GEO