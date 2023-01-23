import { ExternalProvider } from "@ethersproject/providers"
import Button from "components/common/Button"
import useUser from "components/[guild]/hooks/useUser"
import useToast from "hooks/useToast"
import { Plus } from "phosphor-react"
import { useState } from "react"

const LinkAddressButton = ({}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useUser()
  const toast = useToast()

  if (!id) return null

  const onClick = async () => {
    setIsLoading(true)
    window.localStorage.setItem("userId", id.toString())

    try {
      await (window.ethereum as ExternalProvider).request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      })
    } catch (e) {
      if (e.code === 4001) throw e

      toast({
        title: "Your wallet doesn't support switching accounts automatically",
        description: `Please switch to the account you want to link from your wallet manually!`,
        status: "info",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      leftIcon={<Plus />}
      w="full"
      onClick={onClick}
      isLoading={isLoading}
      loadingText="Check your wallet"
    >
      Add address
    </Button>
  )
}

export default LinkAddressButton