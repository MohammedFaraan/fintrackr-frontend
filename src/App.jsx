import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppRouter } from "@/routes/AppRouter"
import { AuthProvider } from "@/features/auth/context/AuthContext"
import { Toaster } from "sonner"

// Initialize TanStack Query Client with defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
        <Toaster position="top-right" richColors closeButton />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
