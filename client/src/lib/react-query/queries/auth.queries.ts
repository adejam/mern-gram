import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "../../../api/auth.api"
import { LOGGED_IN_USER } from "../queryKeys"

export const useGetAuthUser = () => {
  return useQuery({
    queryKey: [LOGGED_IN_USER],
    queryFn: fetchUser,
  })
}
