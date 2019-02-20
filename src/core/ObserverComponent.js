export default ({view, state, handlers}) => {

  const vnode = typeof view.init === 'function' ? view.init() : view
  if (state) {
    vnode.data = {
      ...vnode.data,
      hook: {
        create () {
          state.addObserver(view.observe)
        },
        destroy () {
          state.removeObserver(view.observe)
        }
      }
    }
  }

  return {
    view,
    handlers,
    render: () => vnode
  }
}