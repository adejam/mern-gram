import { Link } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { LOGGED_IN_USER } from "../lib/react-query/queryKeys"

const Header = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData([LOGGED_IN_USER])
  return (
    <nav className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Mern App</h1>
        </Link>
        <ul className="flex gap-4">
          {data ? (
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <Link to="/sign-out">
                <li>Logout</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <li>Sign in</li>
              </Link>
              <Link to="/sign-up">
                <li>Sign up</li>
              </Link>
            </>
          )}

          <>
            <Link to="/sign-in">
              <li>Sign in</li>
            </Link>
            <Link to="/sign-up">
              <li>Sign up</li>
            </Link>
          </>
        </ul>
      </div>
    </nav>
  )
}

export default Header
