import { Menu } from "./components";
import { AppProvider } from "./context/AppContext";

export function App() {

  const src =
    import.meta.env.PROD
      ? "https://pre.sig.gencat.cat/visorEvolutiuTest/index.html?ID=1"
      : "http://localhost:3000/?ID=1";

  return (
    <AppProvider>
      <div className="flex min-h-svh flex-col text-sm!">

        <div className="flex w-full items-center justify-between px-3 border-b">
          <Menu />
          <h1 className="font-medium">API Testing!</h1>
          <a className="text-blue-500 hover:underline hover:bg-accent px-2 h-6.5" href="manual-api-v18.pdf" target="_blank" rel="noopener noreferrer">
            Manual
          </a>
        </div>

        <iframe
          src={src}
          id="iframeMap"
          title="API Testing"
          className="flex-1 w-full border-0"
        />
      </div>
    </AppProvider>
  )
}

export default App
