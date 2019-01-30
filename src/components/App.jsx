/** @jsx html */

import { html } from 'snabbdom-jsx'

import Map from './map/Map'
import SideBar from './sidebar/SideBar'
import Container from '../core/container'

const view = <div>
  <section>
    <Map/>
  </section>
  <aside>
    <SideBar/>
  </aside>
</div>


export default Container(view)