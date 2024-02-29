import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
