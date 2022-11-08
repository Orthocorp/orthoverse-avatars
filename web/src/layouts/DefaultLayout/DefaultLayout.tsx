import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from 'connectkit'
import { WagmiConfig, createClient } from 'wagmi'

type DefaultLayoutProps = {
  children?: React.ReactNode
}
const alchemyId = process.env.ALCHEMY_ID
const client = createClient(
  getDefaultClient({
    appName: 'Orthoverse Avatars',
    alchemyId,
  })
)

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}

export default DefaultLayout
