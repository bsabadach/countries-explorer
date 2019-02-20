import createActions from './actions'
import state from './state'
import { model, Proposals } from './store'

let instance = undefined

const getOrCreate = (state, createModel, Proposals) => {
  if (instance) return instance
  const model = createModel(state)
  const actions = createActions(model.receive.bind(model), Proposals)
  instance = {state, actions}
  return instance
}

export default getOrCreate(state, model, Proposals)
