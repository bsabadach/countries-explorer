import Type from 'union-type'

export const Proposals = Type({
  Countries: [Object],
  SelectCountry: [Object],
  UnSelectCountry: [],
  Filter: [String],
  Sort: [Boolean],
  Pictures: [Object],
  PicturesError: [Object]
})

const createModel = (updates) => {

  const data = {
    allCountries: [],
    displayedCountries: [],
    selectedCountry: void 0,
    sortAscending: true,
    status: {
      initial: true,
      busy: false,
      loaded: false,
      hasError: false,
      error: '',
      filtered: false,
    }
  }

  let observers=[]

  return {
    data:{
      ...data,
    },
    receive (proposal) {
      Proposals.case({
        Countries: (data) => updates.setCountries(data)(data.countries, data.status),
        SelectCountry: (country) => updates.select(data)(country),
        UnSelectCountry: () => updates.unSelect(data)(),
        Filter: (filter) => updates.filterCountries(data)(filter),
        Sort: (isAscending) => updates.sortOnName(data)(isAscending),
        Pictures: (data) => updates.setPictures(data)(data.photos)
      }, proposal)

      this.notify(data)
    },

    subscribe (observer) {
      observers.push(observer)
    },

    unsubscribe (observer) {
      observers = observers.filter(anObserver => {
        return observer !== anObserver
      })
    },

    notify (data) {
      observers.forEach(observer => observer(data))
    },
  }

}

export default createModel

