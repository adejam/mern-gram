import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/Home"

const App = () => {
  return (
    <div className="flex h-screen">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
