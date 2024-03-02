import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { User } from "../../types"

interface Props {
  data: User | null | undefined
  isPending: boolean
}

const AuthLayout = ({ data, isPending }: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPending && data) {
      navigate("/")
    }
  }, [data])

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <main className="w-full">{!isPending && <Outlet />}</main>
    </div>
  )
}

export default AuthLayout
