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
import * as z from "zod"
import { TogglePasswordInput } from "../../ui/toggle-password-input"
import { sigininUserValidationSchema } from "../../../lib/validation/user.schema"
import { CustomLoadingButton } from "../../ui/custom-loading-button"
import { Link } from "react-router-dom"
import { useSignInAccount } from "../../../lib/react-query/mutations/auth.mutations"

type FormValues = z.infer<typeof sigininUserValidationSchema>

const SigninForm = () => {
  const { mutate, isPending } = useSignInAccount()
  const form = useForm<FormValues>({
    resolver: zodResolver(sigininUserValidationSchema),
  })

  const onSubmit = (values: FormValues) => {
    mutate(values)
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
              <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} type="email" />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <FormLabel>Password</FormLabel>
                        <TogglePasswordInput {...field} />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CustomLoadingButton isLoading={isPending}>
                Sign in
              </CustomLoadingButton>
              <p className="text-center">
                Don't have an account?.{" "}
                <Link className="text-blue-600" to={"/sign-in"}>
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default SigninForm
