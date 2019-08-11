/** @jsx html */
import { html } from 'snabbdom-jsx'
import patch from '../../core/sanbbdom-patcher'

import component from '../../core/Component'

import reactor from '../../reactor'

const {state, actions,observable} = reactor

const view = {
  init () {
    this.current = this.states.ready(true)
    return this.current
  },
  create: (ascending) => (
    <div classNames="sidebar_toolbar visible">
      <input classNames="sidebar_search-input"
             type="text"
             name="countryFilter"
             on-keyup={handlers.onFilterChanged}/>
      <i classNames="icon-sort-amount-asc j-asc"
         on-click={handlers.onSortChanged}
         class-active={ascending}/>
      <i classNames="icon-sort-amount-desc j-desc"
         on-click={handlers.onSortChanged}
         class-active={!ascending}/>
    </div>
  ),
  states: {
    ready: (sortAscending) => view.create(sortAscending)
  },
  observe (model) {
    if (state.ready(model) && !state.wasSorted(model)) {
      view.display(view.states.ready(model.isSortAscending))
    }

    if (state.wasSorted(model)) {
      view.display(view.states.ready(model.isSortAscending))
    }
  },
  display (next) {
    this.current = patch(this.current, next)
  },
}

const handlers = {
  onFilterChanged: (e) => {
    e && e.stopImmediatePropagation()
    actions.applyFilter(e.target.value)
  },
  onSortChanged: (e) => {
    e && e.stopImmediatePropagation()
    const direction = e.target.className.split(' ')[1]
    const ascending = direction === 'j-asc'
    actions.applySort(ascending)
  }
}

export default component({observable, handlers, view})
