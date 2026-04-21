import { useState } from "react";
import { Menu } from "./components";
import VisorSelector from "./components/VisorSelector";
import { AppProvider } from "./context/AppContext";

  //121962 equipaments
  //122362 MOE
  
  //Token para MOE:
  //eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL3ByZS5zaWcuZ2VuY2F0LmNhdC9hcGl0ZXN0Mi9pbmRleC5odG1sLzEyMjM2MiIsImlhdCI6MTc3NjY3NDUyMX0.DvtFPZvyVUuTN-T0bvBCZaOWKJKZzeE5rFAC0UVwmmo

const defaultValue = import.meta.env.PROD
  ? "https://pre.sig.gencat.cat/visorHipermapa/?ID=1"
  //: "https://pre.sig.gencat.cat/visorHipermapa/?ID=1"
  // : "https://pre.sig.gencat.cat/visorEvolutiuTest/index.html?ID=1"
  : "http://localhost:3000/?ID=122362";

export function App() {
  const [visorUrl, setVisorUrl] = useState<string>(defaultValue);

  return (
    <AppProvider>
      <div className="flex min-h-svh flex-col text-sm!">

        <div className="flex w-full items-center justify-between px-3 border-b h-7">
          <Menu />
          <VisorSelector defaultValue={defaultValue} onChange={setVisorUrl} />
          <a className="text-blue-500 hover:underline hover:bg-accent px-2" href="manual-api-v18.pdf" target="_blank" rel="noopener noreferrer">
            Manual
          </a>
        </div>

        <iframe
          src={visorUrl}
          id="iframeMap"
          title="API Testing"
          className="flex-1 w-full border-0"
          allowFullScreen
          allow="geolocation; camera; midi; encrypted-media; clipboard-write"
        />
      </div>
    </AppProvider>
  )
}

export default App
