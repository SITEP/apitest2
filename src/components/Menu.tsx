import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import AccordionDemo from "./AccordionDemo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JsonEditorComponent from "./JsonEditorComponent"
import { useAppContext } from "@/context/AppContext"
import { ListIcon, InfoIcon } from "@phosphor-icons/react"
import { useState, useEffect } from "react"

export default function Menu() {
    const { iframeResponse, lastMessage } = useAppContext();
    const [hasNewResponse, setHasNewResponse] = useState(false);

    useEffect(() => {
        if (iframeResponse !== null) {
            setHasNewResponse(true)
        }
    }, [iframeResponse])


    return (
        <Sheet modal={false}>
            <SheetTrigger className="flex items-center gap-2 hover:bg-accent px-2">
                <ListIcon size={20} />
                Menu
            </SheetTrigger>

            <SheetContent
                side="left"
                className="w-full! sm:w-75 flex flex-col h-full"
            >
                {/* Header */}
                <SheetHeader>
                    <SheetTitle>Api operaciones</SheetTitle>
                    <SheetDescription>Seleccione una operación</SheetDescription>
                </SheetHeader>

                {/* Tabs */}
                <Tabs
                    defaultValue="entradas"
                    className="flex flex-col flex-1 overflow-hidden"
                >
                    <TabsList className="mx-3">
                        <TabsTrigger value="entradas">Entradas</TabsTrigger>
                        <TabsTrigger onClick={() => setHasNewResponse(false)} value="respuesta">
                            Respuesta
                            <InfoIcon className={hasNewResponse ? "text-blue-600 animate-accordion-down" : ""} />
                        </TabsTrigger>
                        <TabsTrigger value="enviado">Enviado</TabsTrigger>
                    </TabsList>

                    {/* CONTENIDO SCROLLEABLE */}
                    <TabsContent value="entradas" className="flex-1 overflow-y-auto px-3">
                        <AccordionDemo />
                    </TabsContent>

                    <TabsContent value="respuesta" className="flex-1 overflow-y-auto px-3">
                        <JsonEditorComponent
                            value={iframeResponse} // usa el JSON grande generado
                            defaultMode="tree"
                            onChange={console.log}
                        />
                    </TabsContent>

                    <TabsContent value="enviado" className="flex-1 overflow-y-auto px-3">
                        <JsonEditorComponent
                            value={lastMessage}
                            onChange={console.log}
                        />
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    )
}