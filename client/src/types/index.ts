export type User = {
  _id?: string
  firstName: string
  lastName: string
  username: string
  email: string
  password?: string
  profilePicture?: string
}

export type LoginUser = { email: string; password: string }
