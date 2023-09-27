
export const withStyles = (Component: React.ComponentType<any>) => {
  return (props) => {
    const styles: React.CSSProperties = { padding: '.8rem', backgroundColor: '#09f', border: 'none', borderRadius: '4px', outline: 'none' }
    return <Component style={styles} {...props} />
  }
}
