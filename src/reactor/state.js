export default ({

  observers: [],

  initial (model) {
    return model.status.initial
  },

  busy (model) {
    return model.status.busy && !model.status.initial
  },

  ready (model) {
    return !model.status.busy && model.status.loaded
  },

  countrySelected (model) {
    return model.status.loaded && model.selectedCountry !== void 0
  },

  countryUnSelected (model) {
    return this.ready(model) && !this.countrySelected(model)
  },

  hasPictures (model) {
    return model.selectedCountry
      && Array.isArray(model.selectedCountry.picturesForCountry)
      && model.selectedCountry.picturesForCountry.length > 0
  },

  wasFiltered (model) {
    return model.status.filtered && model.status.loaded
  },

  wasSorted (model) {
    return model.status.sorted && model.status.loaded
  },

  addObserver (observer) {
    this.observers.push(observer)
  },

  removeObserver (observer) {
    this.observers = this.observers.filter(anObserver => {
      return observer !== anObserver
    })
  },

  notifyObservers (model) {
    this.observers.forEach(observer => observer(model))
  },

})
