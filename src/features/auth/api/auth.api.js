import apiClient from "@/lib/axios"

/**
 * Register a new user
 * POST /auth/signup
 * Body: { name, email, password }
 */
export async function signupApi({ name, email, password }) {
  const response = await apiClient.post(
    "/auth/signup",
    { name, email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response.data
}

/**
 * Authenticate existing user
 * POST /auth/login
 * Body: x-www-form-urlencoded (username=<email>&password=<password>)
 */
export async function loginApi({ email, password }) {
  const params = new URLSearchParams()
  params.append("username", email)
  params.append("password", password)

  const response = await apiClient.post("/auth/login", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  return response.data
}

/**
 * Get current user profile (protected)
 * GET /user/profile
 */
export async function getUserProfileApi() {
  const response = await apiClient.get("/user/profile")
  return response.data
}
