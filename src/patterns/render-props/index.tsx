import React from "react"
import { Title } from "./Title"
import { List } from "./List"
import { useState } from "react"

const data = [
  { id: 1, data: 'Item 1' },
  { id: 2, data: 'Item 2' },
  { id: 3, data: 'Item 3' }
]

type InputProps = {
  render: (value: string) => React.ReactNode
}

function Input ({ render }: InputProps) {
  const [value, updateValue] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input type="text" placeholder="Temp in °C" value={value} onChange={(e) => updateValue(e.target.value)} />
      {render(value)}
    </div>
  )
}

function Kelvin ({ temperature }: { temperature: string }) {
  return (
    <span>{(parseInt(temperature) || 0) + 273.15}°K</span>
  )
}

function Fahrenheit ({ temperature }: { temperature: string }) {
  return (
    <span>{((parseInt(temperature) || 0) * 9) / 5 + 32}°F</span>
  )
}

export function RenderProps () {
  return (
    <main>
      <header>
        <Title render={() => <h3>Render Props</h3>} />
        <h3>Pase elementos JSX a los componentes a través de accesorios</h3>
      </header>
      <section>
        <h3>Renderizado de lista usando render props</h3>
        <List data={data} renderItem={(item) => <span>{item.data}</span>} />
      </section>

      <section>
        <h3>☃️ Temperature Converter 🌞</h3>
        <Input
          render={(value: string) => (
            <React.Fragment>
              <Kelvin temperature={value} />
              <Fahrenheit temperature={value} />
            </React.Fragment>
          )}
        />
      </section>
    </main>
  )
}
