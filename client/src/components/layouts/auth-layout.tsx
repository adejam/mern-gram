import { Outlet, useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { LOGGED_IN_USER } from "../../lib/react-query/queryKeys"
import { useEffect } from "react"

const AuthLayout = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData([LOGGED_IN_USER])

  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      navigate("/")
    }
  }, [data])

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
