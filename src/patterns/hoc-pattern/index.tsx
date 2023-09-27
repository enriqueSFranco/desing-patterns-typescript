import { withStyles } from "../../hoc/withStyles"

type ButtonProps = {
  style: React.CSSProperties
}

const Button = ({ style, ...props }: ButtonProps) => {
  return (
    <button style={style} {...props}>Click me!</button>
  )
}

const StyledButton = withStyles(Button)

export const HOCPattern = () => {
  return (
    <main>
      <header>
        <h3>HOC Pattern</h3>
        <h3>Pase la lógica reutilizable como accesorios a los componentes a lo largo de su aplicación</h3>
      </header>
      <StyledButton />
    </main>
  )
}
