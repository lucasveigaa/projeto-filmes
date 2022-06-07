import axios from 'axios'

// BASE URL: https://api.themoviedb.org/3
// /movie/550?api_key=9e3ebc9ba034cc2bd54e11b4a057507b

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api