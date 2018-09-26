import Parse from 'parse'

const Item = Parse.Object.extend('Item')

const createItem = async (name, price) => {
  const item = new Item()
  item.set('name', name)
  item.set('price', price)
  return await item.save()
}

const getItems = async (offset, limit) => {
  const query = new Parse.Query(Item)
  query.select('name', 'price', 'category')
  query.include('category')
  query.skip(offset)
  query.limit(limit)
  return await query.find()
}

export { createItem, getItems }
