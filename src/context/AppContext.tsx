import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react"

/* ==============================
   TYPES
================================ */

type MessagePayload = {
  functionName: string | null
  parameters: any
}

type AppContextType = {
  selectedOperation: string | null
  setSelectedOperation: (value: string | null) => void

  iframeResponse: any
  lastMessage: MessagePayload | null

  handleFormSubmit: (params: any) => void
}

/* ==============================
   CONTEXT
================================ */

const AppContext = createContext<AppContextType | undefined>(undefined)

/* ==============================
   PROVIDER
================================ */

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedOperation, setSelectedOperation] = useState<any>(['validateApi'])

  const [iframeResponse, setIframeResponse] = useState<any>(null)
  const [lastMessage, setLastMessage] = useState<MessagePayload | null>(null)

  /* ==============================
     HELPERS
  =============================== */

  const deepParse = (obj: any): any => {
    if (typeof obj !== "object" || obj === null) return obj

    const result: Record<string, any> = {}

    for (const key in obj) {
      const value = obj[key]

      if (typeof value === "string") {
        try {
          result[key] = JSON.parse(value)
        } catch {
          result[key] = value
        }
      } else {
        result[key] = value
      }
    }

    return result
  }

  /* ==============================
     LISTENER iframe
  =============================== */

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      if (!event.data) return

      const parsedMessage = deepParse(event.data)

      setIframeResponse(parsedMessage)
    }

    window.addEventListener("message", handleMessage)

    return () => window.removeEventListener("message", handleMessage)
  }, [])

  /* ==============================
     ENVÍO DE MENSAJES
  =============================== */

  const handleFormSubmit = (params: any) => {
    const message: MessagePayload = {
      functionName: selectedOperation ? selectedOperation[0] : null,
      parameters: params
    }
    
    setLastMessage(message)

    const iframe = document.getElementById("iframeMap") as HTMLIFrameElement | null

    iframe?.contentWindow?.postMessage(message, "*")
  }

  /* ==============================
     PROVIDER VALUE
  =============================== */

  return (
    <AppContext.Provider
      value={{
        selectedOperation,
        setSelectedOperation,
        iframeResponse,
        lastMessage,
        handleFormSubmit
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/* ==============================
   HOOK
================================ */

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}