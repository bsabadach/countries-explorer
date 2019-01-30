import axios from 'axios'

const endPoint =(query)=>(
`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3ee6f6f53e663a9ecc554c4528e92caa
&user_id=
&text=${query}
&privacy_filter=1
&format=json
&per_page=20
&nojsoncallback=1`)

export default (query) => {
  return axios.get(endPoint(query))
}