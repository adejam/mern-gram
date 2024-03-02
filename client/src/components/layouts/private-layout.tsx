import Header from "../header"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { User } from "../../types"

interface Props {
  data: User | null | undefined
  isPending: boolean
}

const PrivateLayout = ({ data, isPending }: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!data && !isPending) {
      navigate("/sign-in")
    }
  }, [data, isPending])

  return (
    <div className="w-full">
      <Header />
      <main className="w-full max-w-6xl mx-auto">
        {!isPending && <Outlet />}
      </main>
    </div>
  )
}

export default PrivateLayout
