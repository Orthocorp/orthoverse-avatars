type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default DefaultLayout
