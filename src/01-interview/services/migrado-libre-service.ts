export const fetchData = <T> (url: URL): Promise<T> => {
  const { href } = url

  const promise = fetch(href)
    .then(res => res.ok ? res.json() : Promise.reject({ error: 'Opps, ha ocurrido un error', status: res.status, statusText: res.statusText }))
    .then(data => data)
    .catch(error => {
      if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`)
      }
    })

  return promise
}

export async function getProducts () {
  try {
    const url = new URL('https://api.mercadolibre.com/sites/MLA/search?seller_id=179571326')

    const data = await fetchData(url)

    // TODO: MAPPED DATA
    const { results: products } = data
    return products
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`)
    }
  }
}

export async function getCategoryId ({ categoryId }: { categoryId: string }) {
  try {
    const response = await fetchData(new URL(`https://api.mercadolibre.com/categories/${categoryId}`))

    const mappedResponse = {
      pathFromRoot: response.path_from_root,
      childrenCategories: response.children_categories
    }

    return mappedResponse
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`)
    }
  }
}

export async function getCategories () {
  try {
    const url = new URL('https://api.mercadolibre.com/sites/MLM/categories')
    const categories = await fetchData(url) // categories

    const ids = Array.from(new Set(categories.map(category => category.id)))

    const allCategories = await Promise.all(
      ids.map(categoryId => getCategoryId({ categoryId }))
    )
    return allCategories
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`)
    }
  }
}