/** @jsx html */
import { html } from 'snabbdom-jsx'
import patch from '../../core/sanbbdom-patcher'

import component from '../../core/ObserverComponent'
import ListItem from './ListItem'
import reactor from '../../reactor'

const {state, actions, model} = reactor


const countriesItems = (countries) => countries.map(country => <ListItem country={country}
                                                                         onItemSelected={handlers.onCountrySelected}/>)

const view = {
  init () {
    this.current = this.states.waiting()
    return this.current
  },
  create: (child) => (
    <ul classNames="sidebar_list">{child}</ul>
  ),
  states:{
    error: () => view.create(<h2>Loading error</h2>),
    waiting: () => view.create(<div className="spinner"/>),
    ready: ({countries}) => view.create(countriesItems(countries)),
  },
  display (next) {
    const self = this
    self.current = patch(self.current, next)
  },
  observe (model) {
    let nextView

    if (state.initial(model) || state.busy(model)) {
      nextView = view.states.waiting()
    }

    if (state.ready(model)) {
      nextView = view.states.ready(model)
    }

    if (state.wasFiltered(model)) {
      nextView = view.states.ready(model)
    }
    if (state.wasSorted(model)) {
      nextView = view.states.ready(model)
    }
    view.display(nextView)

    if (state.countrySelected(model) && !state.hasPictures(model)) {
      actions.fetchPhotos(model)
    }
  }
}

const handlers = {
  onCountrySelected (country) {
    actions.select(country)
  }
}

export default component({model, view})











