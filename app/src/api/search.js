import Parse from 'parse'

const search = async term => {
  try {
    return await Parse.Cloud.run('search', { term })
  } catch (error) {
    console.error(error)
    return []
  }
}

export { search }
