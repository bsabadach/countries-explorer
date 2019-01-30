import Type from 'union-type'

import createMutations from './mutations'

export const Proposals = Type({
  Countries: [Object],
  SelectCountry: [Object],
  UnSelectCountry: [],
  Filter: [String],
  Sort: [Boolean],
  Pictures: [Object],
  PicturesError: [Object]
})

export const createModel = (createMutations) => {

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

  let observers = []

  const mutations = createMutations(data)
  return {

    addObserver (observer) {
      observers.push(observer)
    },

    removeObserver (observer) {
      observers = observers.filter(anObserver => {
        return observer !== anObserver
      })
    },

    notifyObservers () {
      observers.forEach(observer => observer(this))
    },

    get status () {
      return data.status
    },

    get countries () {
      return data.displayedCountries
    },

    get isSortAscending () {
      return data.sortAscending
    },

    get selectedCountry () {
      return data.selectedCountry
    },

    get pictures () {
      return data.picturesForCountry
    },

    receive (proposal) {

      Proposals.case({
        Countries: (data) => mutations.setCountries(data.countries, data.status),
        SelectCountry: (country) => mutations.select(country),
        UnSelectCountry: () => mutations.unSelect(),
        Filter: (filter) => mutations.filterCountries(filter),
        Sort: (isAscending) => mutations.sortOnName(isAscending),
        Pictures: (data) => mutations.setPictures(data.photos)
      }, proposal)

      this.notifyObservers()

    },
  }

}

export const model = createModel(createMutations)

