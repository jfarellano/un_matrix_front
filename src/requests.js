import r from 'axios'

const URL_SERVER = 'https://unimatrix.jfarellano.xyz'
const WEB_PAGE = 'https://un-matrix.idea-la.com/#/'

function getHeaders() {
  return {headers: {"Authorization": 'Token token=' + localStorage.getItem('secret')}}
} 

export default {
	variables:{
		WEB_PAGE: WEB_PAGE
	},
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
			},
			create: (body) => {
				return r.post(URL_SERVER + '/groups', body, getHeaders())
			},
			schedule: (id) => {
				return r.get(URL_SERVER + '/groups/'+id+'/schedule', getHeaders())
			},
			getLink: (id) => {
				return r.get( URL_SERVER + '/groups/'+id+'/links', getHeaders())
			},
			createLink: (id) => {
				return r.post(URL_SERVER + '/groups/'+id+'/links', {}, getHeaders())
			},
			deleteLink: (link) => {
				return r.delete( URL_SERVER + '/groups/links/' + link, getHeaders())
			},
			deleteMember: (gid, memberid) => {
				return r.delete(URL_SERVER + '/groups/'+gid+'/members/'+memberid, getHeaders())
			}
		},
		share:{
			add: (link) => {
				return r.post( URL_SERVER + '/groups/links/' + link , {}, getHeaders())
			},
			show: (link) => {
				return r.get(URL_SERVER + '/groups/links/schedule/' + link)
			}
		}
	}
}