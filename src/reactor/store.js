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

const createModel = (createMutations) => (state) => {

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

  const mutations = createMutations(data)
  return {

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

      state.notifyObservers(this)
    },
  }

}

export const model = createModel(createMutations)

