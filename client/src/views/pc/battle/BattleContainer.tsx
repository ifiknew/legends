import * as React from 'react';




export interface BattleContainerProps {
  container: HTMLDivElement
}
export default class BattleContainer extends React.Component<BattleContainerProps, any> {

  componentDidMount = () => {
    const { container } = this.props


    // World.addBody(world, Bodies.circle(10, 10, 10))
  }

  public render() {
    return null
  }
}
