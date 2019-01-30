/** @jsx html */
import { html } from 'snabbdom-jsx'

import component from '../../core/ObserverComponent'

export const CountriesItem = (country, onItemSelected) => {

  const handlers = {
    onItemClicked: (e) => {
      e && e.preventDefault()
      e && e.stopImmediatePropagation()
      onItemSelected(country)
    }
  }

  const view =
    <li key={country.alpha3Code}
        on-click={handlers.onItemClicked}>
      <h4 classNames="country-name"><a> {country.name}</a></h4>
    </li>

  return component({view, handlers})

}

export default ({country, onItemSelected}) => CountriesItem(country, onItemSelected).render()



