import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from 'connectkit'
import { WagmiConfig, createClient } from 'wagmi'
import { chain } from 'wagmi'

type DefaultLayoutProps = {
  children?: React.ReactNode
}
// Choose which chains you'd like to show
const chains = [chain.mainnet, chain.goerli]

const alchemyId = process.env.ALCHEMY_ID
const client = createClient(
  getDefaultClient({
    appName: 'Orthoverse Avatars',
    alchemyId,
    chains,
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
