import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { MagnifyingGlass } from "@phosphor-icons/react"
import DynamicApiForm from "./DynamicApiForm"
import { useAppContext } from "@/context/AppContext"
import { accordionItems } from "./jsonconfig"
import { useState, useMemo } from "react"

export default function AccordionDemo() {
  const {
    selectedOperation,
    setSelectedOperation,
    handleFormSubmit
  } = useAppContext()

  const [search, setSearch] = useState("")

  // 🔍 Filtrado optimizado
  const filteredItems = useMemo(() => {
    if (!search.trim()) return accordionItems

    const term = search.toLowerCase()

    return accordionItems.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.value.toLowerCase().includes(term)
    )
  }, [search])

  return (
    <div className="max-w-lg space-y-3 mt-2">
      {/* 🔍 Search input */}
      <InputGroup>
        <InputGroupAddon>
          <MagnifyingGlass />
        </InputGroupAddon>
        <InputGroupInput
          type="text"
          autoFocus={true}
          placeholder="Buscar operación..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Accordion
        multiple={false}
        onValueChange={(values : any) => setSelectedOperation(values)}
        value={Array.isArray(selectedOperation) ? selectedOperation : []}
      >
        {filteredItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <DynamicApiForm
                {...item.content}
                onSubmit={(data: any) => handleFormSubmit(data)}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}