import createActions from './actions'
import state from './state'
import { model, Proposals } from './store'

let instance = undefined

const getOrCreate = (state, model, Proposals) => {
  if (instance) return instance
  const actions = createActions(model.receive.bind(model), Proposals)
  instance = {state, actions, model}
  return instance
}

export default getOrCreate(state, model, Proposals)
