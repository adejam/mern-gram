import UpdateUserForm from "../components/forms/user/update-user-form"
import { User } from "../types"

interface Props {
  data: User | null | undefined
  isPending: boolean
}

const ProfilePage = ({ data, isPending }: Props) => {
  if (isPending || !data) return null
  return (
    <div>
      <UpdateUserForm user={data as User} />
    </div>
  )
}

export default ProfilePage
