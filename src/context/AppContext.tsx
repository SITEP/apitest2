import { deepParse } from "@/lib/utils"
import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react"

type MessagePayload = {
  functionName: string | null
  parameters: any
}

type AppContextType = {
  selectedOperation: string | null
  setSelectedOperation: (value: string | null) => void

  iframeResponse: any
  lastMessage: MessagePayload | null
  visorToken: string | null
  setVisorToken: (value: string | null) => void

  handleFormSubmit: (params: any) => void
}


const AppContext = createContext<AppContextType | undefined>(undefined)


export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedOperation, setSelectedOperation] = useState<any>(['validateApi'])

  const [iframeResponse, setIframeResponse] = useState<any>(null)
  const [lastMessage, setLastMessage] = useState<MessagePayload | null>(null)
  const [visorToken, setVisorToken] = useState<string | null>(() => {
    return import.meta.env.PROD ? 
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LzIiLCJpYXQiOjE3MTgwMjY4NTB9.-1enTeVcqnqeAopYHAPEajX85_Q60T2pQZeU7NWr3Tc3":
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL3ByZS5zaWcuZ2VuY2F0LmNhdC9hcGl0ZXN0Mi9pbmRleC5odG1sLzEyMjM2MiIsImlhdCI6MTc3NjY3NDUyMX0.DvtFPZvyVUuTN-T0bvBCZaOWKJKZzeE5rFAC0UVwmmo"
  })


  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      if (!event.data) return

      const parsedMessage = deepParse(event.data)

      setIframeResponse(parsedMessage)
    }

    window.addEventListener("message", handleMessage)

    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const handleFormSubmit = (params: any) => {
    const message: MessagePayload = {
      functionName: selectedOperation ? selectedOperation[0] : null,
      parameters: params
    }
    
    setLastMessage(message)

    const iframe = document.getElementById("iframeMap") as HTMLIFrameElement | null

    iframe?.contentWindow?.postMessage(message, "*")

    console.log("Mensaje enviado al iframe:", message)
  }

  return (
    <AppContext.Provider
      value={{
        selectedOperation,
        setSelectedOperation,
        iframeResponse,
        lastMessage,
        visorToken,
        setVisorToken,
        handleFormSubmit
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}