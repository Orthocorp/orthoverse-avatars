type DefaultLayoutProps = {
  children?: React.ReactNode
}
import { Toaster } from '@redwoodjs/web/toast'

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Toaster />
      <main>{children}</main>
    </>
  )
}

export default DefaultLayout
