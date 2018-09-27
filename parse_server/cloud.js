/* global Parse */
require('dotenv').config()
const fetch = require('node-fetch')

const { ELASTIC_SEARCH_INDEX, ELASTIC_SEARCH_HOST } = process.env

function buildBulkUpsertData(items) {
  const stringArray = items.reduce((accumulator, item) => {
    accumulator.push(JSON.stringify(
      { index: { _index: ELASTIC_SEARCH_INDEX, _type: '_doc', _id: item.id } }
    ))
    accumulator.push(JSON.stringify({ name: item.get('name') }))
    return accumulator
  }, [])
  return stringArray.join('\n') + '\n'
}

Parse.Cloud.job('reIndexElasticSearch', async (request) => {
  const Item = Parse.Object.extend('Item')
  const query = new Parse.Query(Item)
  query.select('name')

  // For real codebase should loop until end of result
  query.limit(1000)

  try {
    const items = buildBulkUpsertData(await query.find())
    // Delete all entries
    await fetch(`${ELASTIC_SEARCH_HOST}/${ELASTIC_SEARCH_INDEX}/_delete_by_query`, {
      method: 'POST',
      body: { query : { match_all : {} } },
      headers: { 'Content-Type': 'application/json' },
    })

    // Input new entries
    await fetch(`${ELASTIC_SEARCH_HOST}/_bulk`, {
      method: 'POST',
      body: items,
      headers: { 'Content-Type': 'application/json' },
    })
    request.message('re-indexing completed')
  } catch (error) {
    request.message(error)
  }
})

Parse.Cloud.define('search', async (request) => {
  try {
    const result = await fetch(`${ELASTIC_SEARCH_HOST}/${ELASTIC_SEARCH_INDEX}/_search`, {
      method: 'POST',
      body: JSON.stringify({ query : { wildcard : { name: `*${request.params.term}*` } } }),
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await result.json()
    const hits = json.hits && json.hits.hits || []
    return hits.map(hit => hit._id)
  } catch (error) {
    console.error(error)
    return []
  }
})
