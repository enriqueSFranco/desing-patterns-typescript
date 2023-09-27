type HeaderProps = {
  children: React.ReactNode
}

export function Header ({ children }: HeaderProps) {
  return (
    <header>
      <ul style={{ listStyle: 'none', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </ul>
    </header>
  )
}

