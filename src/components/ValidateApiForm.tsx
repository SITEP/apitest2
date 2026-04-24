import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useAppContext } from "@/context/AppContext";
import { Button } from "./ui/button";

export default function ValidateApiForm() {
    const { visorToken, setVisorToken } = useAppContext();

    const sendMessageToIframe = (message: any) => {
        const iframe = document.getElementById("iframeMap") as HTMLIFrameElement | null
        iframe?.contentWindow?.postMessage(message, "*")
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessageToIframe({
            "functionName": "validateApi",
            "parameters": [visorToken]
        })
    };

    return (
        <AccordionItem value="validateApi">
            <AccordionTrigger>
                Validate API
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <textarea
                        name="token"
                        id="token"
                        placeholder="Visor Token"
                        rows={5}
                        className="p-2 border border-gray-300 focus:outline-none"
                        value={visorToken || ""}
                        onChange={(e) => setVisorToken(e.target.value)}
                    />
                    <Button className="w-full" type="submit" autoFocus={true}>
                        Validate
                    </Button>
                </form>
            </AccordionContent>
        </AccordionItem>
    )
}