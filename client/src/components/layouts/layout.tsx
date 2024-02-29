import Header from "../header"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="w-full">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
