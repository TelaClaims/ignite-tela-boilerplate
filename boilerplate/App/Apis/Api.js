const baseUrl = 'https://api.github.com/'

const headers = new Headers({
  'Cache-Control': 'no-cache'
})

const baseConfig = {
  headers: headers,
  cache: 'default'
}

const getConfig = {
  ...baseConfig,
  method: 'GET'
}

const Request = {
  get: (uri, query) => {
    const url = baseUrl + uri + this.query(query)
    return new Promise((resolve, reject) => {
      fetch(url, getConfig).then((res) => {
        res.ok ? resolve(res) : reject(res)
      })
    })
  },
  query: (query) => {
    return Object.keys.reduce(function (str, key, i) {
      let delimiter, val
      delimiter = (i === 0) ? '?' : '&'
      key = encodeURIComponent(key)
      val = encodeURIComponent(query[key])
      return [str, delimiter, key, '=', val].join('')
    }, '')
  }
}

const getRoot = () => Request.get('')
const getRate = () => Request.get('rate_limit')
const getUser = (username) => Request.get('search/users', {q: username})

export default {
  getRoot,
  getRate,
  getUser
}
