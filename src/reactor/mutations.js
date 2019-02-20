export default (data) => ({

  setCountries (countries) {
    data.allCountries = this.processResponse(countries)
    data.displayedCountries = [].concat(data.allCountries)
    data.status = {
      ...data.status,
      loaded: true,
      busy: false,
      initial: false
    }
  },

  select (country) {
    data.selectedCountry = country
  },

  unSelect () {
    data.selectedCountry = void 0
  },

  setPictures (photos) {
    data.selectedCountry.picturesForCountry = photos.photo
  },

  processResponse (loadedCountries) {
    return loadedCountries.map(country => {
      country.timezones = Array.isArray(country.timezones) ? country.timezones : [country.timezones]
      return country
    })
  },

  sortOnName: (isAscending) => {
    data.displayedCountries = [].concat(data.allCountries).sort((country1, country2) => isAscending ? country1.name.localeCompare(country2.name) : country2.name.localeCompare(country1.name))
    data.sortAscending = isAscending
    data.status.sorted = true
  }

})
