export const updates= ({

    setCountries: (data) => (countries) => {
        data.allCountries = updates.processResponse(countries)
        data.displayedCountries = [].concat(data.allCountries)
        data.status = {
            ...data.status,
            loaded: true,
            busy: false,
            initial: false
        }
    },

    select: (data) => (country) => {
        data.selectedCountry = country
    },

    unSelect: (data) => () => {
        data.selectedCountry = void 0
    },

    setPictures: (data) => (photos) => {
        data.selectedCountry.picturesForCountry = photos.photo
    },

    processResponse: (loadedCountries) => {
        return loadedCountries.map(country => {
            country.timezones = Array.isArray(country.timezones) ? country.timezones : [country.timezones]
            return country
        })
    },

    sortOnName: (data) => (isAscending) => {
        data.displayedCountries = [].concat(data.allCountries).sort((country1, country2) => isAscending ? country1.name.localeCompare(country2.name) : country2.name.localeCompare(country1.name))
        data.sortAscending = isAscending
        data.status.sorted = true
    }

})
