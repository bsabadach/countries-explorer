export default ({ view,model, handlers}) => {

  const vnode = typeof view.init === 'function' ? view.init() : view
  if (model) {
    vnode.data = {
      ...vnode.data,
      hook: {
        create () {
          model.addObserver(view.observe)
        },
        destroy () {
          model.removeObserver(view.observe)
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