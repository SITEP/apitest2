import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

// 1. Tipo del estado
type AppContextType = {
  selectedOperation: string | null
  setSelectedOperation: (value: string | null) => void
  lastSubmit: { operation: string | null; params: any } | null
  handleFormSubmit: (params: any) => void
}

// 2. Crear contexto
const AppContext = createContext<AppContextType | undefined>(undefined)

// 3. Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null)
  const [lastSubmit, setLastSubmit] = useState<{ operation: string | null; params: any } | null>(null)

  const handleFormSubmit = (params: any) => {
    setLastSubmit({ operation: selectedOperation, params })
    console.log(`[AppContext] Submit [${selectedOperation}]`, params)
  }

  return (
    <AppContext.Provider
      value={{
        selectedOperation,
        setSelectedOperation,
        lastSubmit,
        handleFormSubmit
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// 4. Hook custom
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}