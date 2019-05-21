import axios from 'axios'

export default class ApiProvider{
  constructor(){
    this.service = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com/albums'
    })
  }

  listAlbums(){
    return this.service.get('/')
    .then(response => response)
    .catch(error => error)
  }

  listPhotos(id){
    return this.service.get(`${id}/photos`)
    .then(response => response)
    .catch(error => error)
  }
}