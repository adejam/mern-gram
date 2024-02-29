import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/layouts/auth-layout"
import Layout from "./components/layouts/layout"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

const App = () => {
  return (
    <div className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
        </Route>

        {/* HomeLayout */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
