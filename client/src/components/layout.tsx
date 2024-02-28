import Header from "./header"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="w-full">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
