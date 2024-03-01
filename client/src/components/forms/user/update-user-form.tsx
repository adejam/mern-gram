import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  UpdateUserType,
  updateUserValidationSchema,
} from "../../../lib/validation/user.schema"
import { CustomLoadingButton } from "../../ui/custom-loading-button"
import { useUpdateUser } from "../../../lib/react-query/mutations/auth.mutations"
import { User } from "../../../types"

const UpdateUserForm = ({ user }: { user: User }) => {
  const userDataToUpdate = updateUserValidationSchema.parse(user)

  const { mutate, isPending } = useUpdateUser()
  const form = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserValidationSchema),
    defaultValues: { ...userDataToUpdate },
  })

  const onSubmit = (values: UpdateUserType) => {
    mutate({ userData: values, id: user._id! })
  }

  return (
    <div className="px-4 py-6 md:py-12 lg:py-16 max-w-[600px] m-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 space-y-8"
        >
          <Card className="bg-white-with-dark-theme p-3">
            <CardHeader className="text-center">
              <CardTitle>Update User information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <FormLabel>Firstname</FormLabel>
                        <Input {...field} />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <FormLabel>Lastname</FormLabel>
                        <Input {...field} />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <FormLabel>Username</FormLabel>
                        <Input {...field} />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CustomLoadingButton isLoading={isPending}>
                Update
              </CustomLoadingButton>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default UpdateUserForm
