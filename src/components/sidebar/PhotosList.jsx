/** @jsx html */
import { html } from 'snabbdom-jsx'
import patch from '../../core/sanbbdom-patcher'

import component from '../../core/ObserverComponent'
import reactor from '../../reactor'

const {state, model} = reactor

const url = (photo) => {
  const {farm, server, id, secret} = photo
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
}

const photosItems = (country) => country.picturesForCountry.map(photo =>
  <li key={photo.id}>
    <img src={url(photo)}
         classNames="sidebar_photo"/>
  </li>)

const view = {
  init () {
    this.current = this.states.empty()
    return this.current
  },
  states: {
    empty: () => <div></div>,
    filled: (model) => view.create(model.selectedCountry)
  },
  create: (country) => <ul classNames="sidebar_photo-list">
    {photosItems(country)}
  </ul>,

  display (next) {
    this.current = patch(this.current, next)
  },
  observe (model) {
    if (!state.countrySelected(model)) {
      view.display(view.states.empty())
    }
    if (state.countrySelected(model) && state.hasPictures(model)) {
      view.display(view.states.filled(model))
    }
  }
}

export default component({model, view})


