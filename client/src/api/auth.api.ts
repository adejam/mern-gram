import { User } from "../types"

export async function signUpUser(user: User) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    const data = await res.json()
    return data
  } catch (error) {
    return error
  }
}
