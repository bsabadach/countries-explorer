export default ({view, observable}) => {

  const vnode = typeof view.init === 'function' ? view.init() : view
  if (observable) {
    vnode.data = {
      ...vnode.data,
      hook: {
        create () {
          observable.subscribe(view.observe)
        },
        destroy () {
          observable.unsubscribe(view.observe)
        }
      }
    }
  }

  return {
    view,
    render: () => vnode
  }
}