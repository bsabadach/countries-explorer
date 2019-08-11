import createActions from './actions'
import state from './state'
import {updates} from './updates'
import createModel, {Proposals} from './model'


const store = (state, createModel, Proposals) => {
    if (!store.instance) {
        const model = createModel(updates)
        const actions = createActions(model.receive.bind(model), Proposals)
        const observable = {
            subscribe: model.subscribe.bind(model),
            unsubscribe: model.unsubscribe.bind(model),
        }
        store.instance = {state, actions, observable}
    }
    return store.instance
}

export default store(state, createModel, Proposals)
