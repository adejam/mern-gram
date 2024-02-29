import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { signInUser, signUpUser } from "../../../api/auth.api"
import { LoginUser, User } from "../../../types"
import { CREATE_USER_ACCOUNT, LOGGED_IN_USER } from "../queryKeys"
import { toast } from "sonner"
import { UNKNOWN_SERVER_ERROR } from "../../constants"

export const useSignUp = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: User) => signUpUser(values),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: [CREATE_USER_ACCOUNT],
        })
        navigate("/sign-in")
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    },
    onError() {
      toast.error(UNKNOWN_SERVER_ERROR)
    },
  })
}

export const useSignInAccount = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: LoginUser) => signInUser(user),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: [LOGGED_IN_USER],
        })

        queryClient.setQueryData([LOGGED_IN_USER], data)
        navigate("/")
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    },
    onError() {
      toast.error(UNKNOWN_SERVER_ERROR)
    },
  })
}
