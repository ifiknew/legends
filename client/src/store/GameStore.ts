interface SubscribeFn {
  <T>(selector: ((state: App.StoreState) => T), callback: (state: T) => void) : void 
  (selector: null, callback: (state: App.StoreState) => void) : void 
}
type SubscribeOption<T> = {
  selector: (state: App.StoreState) => T,
  callback: (state: T) => void
} | {
  selector: null,
  callback: (state: App.StoreState) => void
}
interface Reducer {
  (state: App.StoreState ,message: App.Message): App.StoreState
}

class GameStore {

  private state: App.StoreState = {}
  private reducer: Reducer = () => this.state
  private subscribes: Array<SubscribeOption<any>> = []

  private _caches: Map<Function, any> = new Map()
  

  public dispatch = (message: App.Message) => {
    const currentState = this.state
    const nextState = this.reducer(this.state, message)
    this.state = nextState
    this.subscribes.forEach(op => {
      if (op.selector == null) {
        if (currentState != nextState) {
          op.callback(nextState)
        }
      } else {
        const cache = this._caches.get(op.selector)
        const nextCache = op.selector(nextState)
        if (cache != nextCache) {
          this._caches.set(op.selector, nextCache)
          op.callback(nextCache)
        }
      }
    })
  }

  public setReducer = (reducer: Reducer) => {
    this.reducer = reducer
  }

  public subscribe: SubscribeFn = (selector: any, callback: any) => {
    this.subscribes.push({ selector, callback })
  }
}

export default GameStore