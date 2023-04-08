function Header ({ children }) {
  return (
    <header>
      <ul style={{ listStyle: 'none', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </ul>
    </header>
  )
}

export default Header
