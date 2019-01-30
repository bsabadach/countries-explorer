import fetchCountryPhotos from '../resource/country-photos'
import fetchCountries from '../resource/countries'

export default (propose, Proposals) => ({

  select (country) {
    propose(Proposals.SelectCountry(country))
  },

  fetchPhotos ({selectedCountry}) {
    fetchCountryPhotos(selectedCountry.name).then(response => {
      propose(Proposals.Pictures(response.data))
    }).catch(error => {
      propose(Proposals.PicturesError(error))
    })
  }
  ,
  unSelect () {
    propose(Proposals.UnSelectCountry)
  },

  async load () {
    let data = {}
    let response
    try {
      response = await fetchCountries()
      data.countries = response.data
    } catch
      (error) {
      data.status = {
        ...data.status,
        loaded: false,
        busy: false,
        hasError: true,
        initial: false,
        error: error
      }
    } finally {
      propose(Proposals.Countries(data))
    }

  },

  applyFilter (value) {
    const filter = value.trim()
    propose(Proposals.Filter(filter))
  },

  applySort (ascending) {
    propose(Proposals.Sort(ascending))
  }
})
