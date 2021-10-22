import axios from 'axios'

const baseUrl = '/api/books'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (data) => {
    const response = await axios.post(baseUrl, data)
    return response.data
}

const update = async (data, id) => {
    const response = await axios.put(`${baseUrl}/${id}`, data)
    return response.data
}

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

const booksService = { getAll, create, update, remove }
export default booksService