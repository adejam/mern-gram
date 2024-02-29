import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card"
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
import { createUserValidationSchema } from "../../../lib/validation/user.schema"
import { CustomLoadingButton } from "../../ui/custom-loading-button"
import { Link } from "react-router-dom"
import { useSignUp } from "../../../lib/react-query/mutations/auth.mutations"

type FormValues = z.infer<typeof createUserValidationSchema>

const SignupForm = () => {
  const { mutate, isPending } = useSignUp()
  const form = useForm<FormValues>({
    resolver: zodResolver(createUserValidationSchema),
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
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your information to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-8">
              <div className="flex space-x-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
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
                    <FormItem className="w-1/2">
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
              </div>
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
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <FormLabel>Confirm Password</FormLabel>
                        <TogglePasswordInput {...field} />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CustomLoadingButton isLoading={isPending}>
                Sign up
              </CustomLoadingButton>
              <p className="text-center">
                Already have an account?.{" "}
                <Link className="text-blue-600" to={"/sign-in"}>
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default SignupForm
