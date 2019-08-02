import r from 'axios'

const URL_SERVER = 'https://unimatrix.jfarellano.xyz'

function getHeaders() {
  return {headers: {"Authorization": 'Token token=' + localStorage.getItem('secret')}}
} 

export default {
	authentication: {
		requests: {
			login: (body) => {
				return r.post(URL_SERVER + '/sessions', body)
			},
			logout: () => {
				return r.delete( URL_SERVER + '/sessions', getHeaders())
			}
		},
		handdler: {
			logged: () => {
				return localStorage.getItem('secret') != null ? true : false
			}
		}
	},
	storage: {
		set: (key, info) => {
			localStorage.setItem(key, info)
		},
		get: (key) => {
			return localStorage.getItem(key)
		}
	},
	error: {
		handdle: (response, action, fallback) => {
			if(typeof response.data == 'object'){
				action('authentication')
			}else{
				if(response.data.includes('Mechanize')){
					fallback()
				}else if(response.data.includes('split')){
					action('unable_to_login')
				}else{
					action('unknown') 
				}
			}
		}
	},
	requests: {
		schedule: {
			get: (body) => {
				return r.post( URL_SERVER + '/scraper/student_schedule', body, getHeaders())
			}
		},
		user: {
			get: (id) => {
				return r.get( URL_SERVER + '/users/' + id, getHeaders())
			}
		},
		matrix: {
			index: () => {
				return r.get(URL_SERVER + '/groups', getHeaders())
			},
			delete: (id) => {
				return r.delete(URL_SERVER + '/groups/' + id, getHeaders())
			}
		}
	}
}