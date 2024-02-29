import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { signUpUser } from "../../../api/auth.api"
import { User } from "../../../types"
import { CREATE_USER_ACCOUNT } from "../queryKeys"
import { toast } from "sonner"

export const useSignUp = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: User) => signUpUser(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CREATE_USER_ACCOUNT],
      })
      navigate("/")
      toast.success("User successfully created.")
    },
    onError() {
      toast.error("An error occured while signing up.")
    },
  })
}
