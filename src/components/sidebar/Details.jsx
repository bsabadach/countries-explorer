/** @jsx html */
import { html } from 'snabbdom-jsx'
import patch from '../../core/sanbbdom-patcher'

import component from '../../core/ObserverComponent'
import reactor from '../../reactor'
import Photos from './PhotosList'

const {state, actions} = reactor

const view = {
  init () {
    this.current = this.create({})
    return this.current
  },
  create: (country) => (
    <div classNames="sidebar_details-wrapper">
      <div classNames="sidebar_details-header">
        <a><i classNames="icon-angle-double-left sidebar_close-button"
              on-click={handlers.onCloseButtonClicked}/></a>
      </div>
      <h3 classNames="sidebar_country-name"> {country.name}</h3>
      <div classNames="sidebar_details">
        <div classNames="sidebar_details-item"><label>Region:</label><span>{country.region}</span></div>
        <div classNames="sidebar_details-item"><label>Sub region:</label><span>{country.subregion}</span></div>
        <div classNames="sidebar_details-item"><label>Capital:</label><span>{country.capital}</span></div>
        <div classNames="sidebar_details-item"><label>Population:</label><span>{country.population}</span></div>
      </div>
      <Photos state={state}/>
    </div>),
  visible: ({selectedCountry}) => view.create(selectedCountry),

  display (nextView) {
    this.current = patch(this.current, nextView)
  },
  observe (model) {
    let nextView
    if (state.countrySelected(model)) {
      nextView = view.visible(model)
    }
    nextView && view.display(nextView)
  }
}

const handlers = {
  onCloseButtonClicked: (e) => {
    e && e.preventDefault()
    e && e.stopImmediatePropagation()
    actions.unSelect()
  }
}

export default component({state, handlers, view})


