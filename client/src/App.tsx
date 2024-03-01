import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/layouts/auth-layout"
import Layout from "./components/layouts/layout"
import PrivateLayout from "./components/layouts/private-layout"
import { useGetAuthUser } from "./lib/react-query/queries/auth.queries"
import Home from "./pages/Home"
import ProfilePage from "./pages/Profile"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

const App = () => {
  const { data, isPending } = useGetAuthUser()
  const layoutProps = { data, isPending }

  return (
    <div className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout {...layoutProps} />}>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
        </Route>

        {/* HomeLayout */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateLayout {...layoutProps} />}>
          <Route path="/profile" element={<ProfilePage {...layoutProps} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
