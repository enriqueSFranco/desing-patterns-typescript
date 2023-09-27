type Item<T> = {
  data: T
}

type ItemListProps<T> = {
  data: Item<T>[]
  renderItem: (item: Item<T>) => React.ReactNode
}

export function List<T> ({ data, renderItem }: ItemListProps<T>) {
  return (
    <ul>
      {data.map((item) => <li key={crypto.randomUUID()}>{renderItem(item)}</li>)}
    </ul>
  )
}