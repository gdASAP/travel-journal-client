import apiUrl from '../apiConfig'
import axios from 'axios'

// export const createOrder = (order) => {
//   return axios({
//     method: 'POST',
//     url: apiUrl + '/order',
//     data: order
//   })
// }

export const showHistory = (user) => {
  return axios({
    url: apiUrl + '/journal-history',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}
