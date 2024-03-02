import { Link } from "react-router-dom"
import { useGetAuthUser } from "../lib/react-query/queries/auth.queries"
import LogoutButton from "./forms/auth/logout-button"

const Header = () => {
  const { data, isPending } = useGetAuthUser()
  return (
    <nav className="border-b border-gray-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Mern App</h1>
        </Link>
        <ul className="flex gap-4 justify-center items-center">
          {data && !isPending && (
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/profile">
                <li>
                  <span className="inline-flex items-center justify-center size-[46px] text-sm font-semibold leading-none rounded-full bg-gray-50 text-gray-500 dark:bg-white/[.05] dark:text-white">
                    {data.firstName[0].toLocaleUpperCase()}
                    {data.lastName[0].toLocaleUpperCase()}
                  </span>
                </li>
              </Link>

              <li>
                <LogoutButton />
              </li>
            </>
          )}
          {!data && !isPending && (
            <>
              <Link to="/sign-in">
                <li>Sign in</li>
              </Link>
              <Link to="/sign-up">
                <li>Sign up</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
