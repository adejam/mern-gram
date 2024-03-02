import { CustomLoadingButton } from "../../ui/custom-loading-button"
import { useLogoutUser } from "../../../lib/react-query/mutations/auth.mutations"

const LogoutButton = () => {
  const { mutate, isPending } = useLogoutUser()
  return (
    <CustomLoadingButton
      isLoading={isPending}
      type="button"
      onClick={() => mutate()}
    >
      Logout
    </CustomLoadingButton>
  )
}

export default LogoutButton
