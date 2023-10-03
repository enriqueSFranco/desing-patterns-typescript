import { withStyles } from "./withStyles"
import { withDataFetch } from "./withDataFetch"
import { type Pokemon } from "./models.d"

type ButtonProps = {
  style: React.CSSProperties
}

type PokemonProps = {
  data: Pokemon
  error: null
  loading: boolean
}

const Button = ({ style, ...props }: ButtonProps) => {
  return (
    <button style={style} {...props}>Click me!</button>
  )
}

const Pokemon = ({ data, error, loading, ...props }: PokemonProps) => {
  console.log({ data, error, loading })

  return (
    <div>
      <h1>pokemon</h1>
    </div>
  )
}

const StyledButton = withStyles(Button)
const PokemonWithData = withDataFetch(Pokemon)

export const HOCPattern = () => {
  return (
    <main>
      <header>
        <h3>HOC Pattern</h3>
        <h3>Pase la lógica reutilizable como accesorios a los componentes a lo largo de su aplicación</h3>
      </header>
      <PokemonWithData />
      <StyledButton />
    </main>
  )
}
