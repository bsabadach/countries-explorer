import axios from 'axios'

const authenticationHeader = {'X-Mashape-Key': 'l5eMXwY6d3mshmvnljsx6GVH9YWxp1IsKhsjsnSAZ5yXpYiGRl'}
const endPoint = 'https://restcountries-v1.p.mashape.com/all'

export default () => {
  return axios.get(endPoint, {
    headers: authenticationHeader
  })
}

