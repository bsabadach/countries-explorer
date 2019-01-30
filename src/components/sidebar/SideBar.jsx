/** @jsx html */
import { html } from 'snabbdom-jsx'
import patch from '../../core/sanbbdom-patcher'

import component from '../../core/ObserverComponent'
import List from './List'
import ToolBar from './Toolbar'
import Details from './Details'
import reactor from '../../reactor'

const {state, model} = reactor

const view = {
  isCollapsed: false,
  isDetailsVisible: false,
  init () {
    this.current = this.states.list()
    return this.current
  },
  states:{
    list: () => view.create(view.isDetailsVisible, view.isCollapsed),
    details: () => view.create(view.isDetailsVisible, view.isCollapsed),
  },
  create: (isDetailsVisible, isCollapsed) =>
    <nav classNames="sidebar"
         class-collapsed={isCollapsed}>
      <div classNames="sidebar_mask">
      </div>
      <div classNames="sidebar_toggler">
        <i className={isCollapsed ? 'icon-three-bars' : 'icon-x'}
           on-click={handlers.onTogglerClicked}/>
      </div>
      <div classNames="sidebar_content-mask">
        <div class-details={isDetailsVisible}
             classNames="sidebar_content">
          <div classNames="sidebar_details-wrapper">
            <Details/>
          </div>
          <div classNames="sidebar_list-wrapper">
            <ToolBar/>
            <List/>
          </div>
        </div>
      </div>
    </nav>,
  observe (model) {
    let nextView
    if (state.countrySelected(model)) {
      view.isDetailsVisible = true
      nextView = view.states.details()
    }
    if (!state.countrySelected(model)) {
      view.isDetailsVisible = false
      nextView = view.states.list()
    }
    nextView && view.display(nextView)
  },

  display (nextView) {
    const self = this
    self.current = patch(self.current, nextView)
  }
}

const handlers = {
  onTogglerClicked: () => {
    view.isCollapsed = !view.isCollapsed
    view.display(view.create(view.isDetailsVisible, view.isCollapsed))
  }
}

export default component({model, handlers, view})

