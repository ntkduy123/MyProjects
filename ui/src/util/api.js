export const callApi = async (url, method, params, type) => {
  const fetchRequest = createFetchRequest(url, method, params, type)

  const request = await fetchRequest
  const response = await request.json()
  return response
}

const createFetchRequest = (url, method, params, type) => {
  const body = ['POST', 'PUT'].indexOf(method) >= 0 && params
    ? (type === 'upload' ? getFormData(params) : JSON.stringify(params))
    : undefined

  const queryParams = ['GET'].indexOf(method) >= 0 && params
    ? `?${getEncodedUrlParams(params)}`
    : ''

  const fetchRequest = fetch(`${getApiUrl(url)}${queryParams}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line no-undef
      'authorization': localStorage.getItem('api_key')
    },
    body
  })
  return fetchRequest
}

const getFormData = (params) => {
  const formData = new FormData()
  Object.keys(params).forEach(key => formData.append(key, params[key]))
  return formData
}

const getApiUrl = (url) => {
  if (/^http[s]*:\/\/.+/.test(url)) {
    return url
  }

  // eslint-disable-next-line
  return `${url}`
}

const getEncodedUrlParams = params => Object.keys(params)
  .map(key => (params[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}` : ''))
  .join('&')