import { Component } from "react"
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Slider } from "@/components/ui/slider"
import { InfoIcon, GpsFixIcon } from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { deepParse } from "@/lib/utils"

type CercadorMoeFormState = {
    withCoords: boolean
    address: string
    radius: number
    utm?: [number, number]
}

class CercadorMoeForm extends Component<{ isActive: boolean | undefined }, CercadorMoeFormState> {
    constructor(props: { isActive: boolean | undefined }) {
        super(props)
        this.state = {
            withCoords: false,
            address: "",
            radius: 1,
        }
    }

    componentDidMount() {
        window.addEventListener("message", this.handleMessage)
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.handleMessage);
    }

    sendMessageToIframe = (message: any) => {
        const iframe = document.getElementById("iframeMap") as HTMLIFrameElement | null
        iframe?.contentWindow?.postMessage(message, "*")
    }

    handleMessage = (event: MessageEvent) => {
        if (!event.data || !this.props.isActive) return

        const parsedMessage = deepParse(event.data)

        switch (parsedMessage.infoName) {
            case "getUserLocation":
                if (parsedMessage.data && parsedMessage.data.utm) {
                    this.setState({
                        utm: parsedMessage.data.utm
                    }, () => this.step1())
                }
                break
            case "geocode":
                if (parsedMessage.results && parsedMessage.results.length > 0) {
                    this.setState({
                        utm: parsedMessage.results[0].coordinates.utm
                    }, () => this.step1())
                }
                break
            case "getLegendInfo":
                if (parsedMessage.data && parsedMessage.data.length > 0) {
                    this.step2(parsedMessage.data)
                }
                break
            case "getFeatureInfo":
                console.log("getFeatureInfo", parsedMessage)
                if (parsedMessage.data && parsedMessage.data) {
                    this.step3(parsedMessage.data)
                }
                break
            default:
                console.warn("Función desconocida recibida del iframe:", parsedMessage)
        }
    }

    // Filtrar simple
    step1 = () => {

        const { radius, utm } = this.state
        if (!utm) return
        const radiusInMeters = radius * 1000

        // Dibuixa el cercle al mapa a partir de les coordenades de geocode
        this.sendMessageToIframe({
            "functionName": "drawCircle",
            "parameters": [
                utm,
                radiusInMeters,
                "EPSG:25831",
                { "color": "#c00000", "width": 2, "opacity": 10, "borderType": "solid" }
            ]
        })

        //Aplico filtro circular lonlat + radius y Zoom al area
        this.sendMessageToIframe({
            "functionName": "simpleFilter",
            "parameters": [
                {
                    "layerName": "EDUCACIO_OFERTA_ESCOLAR",
                    "type": "cercle",
                    "geom": [utm, radiusInMeters],
                    "epsg": "EPSG:25831"
                },
                true,
                false
            ]
        })

        //Get legend info para ver que zonas estan activadas
        this.sendMessageToIframe({
            "functionName": "getLegendInfo",
            "parameters": []
        })

    }

    step2 = (data: any) => {
        const { utm } = this.state
        if (!utm) return

        const zonesSet = new Set([
            "EDUCACIO_AREESTERRITORIALS",
            "EDUCACIO_ZONES_SECUNDARIA",
            "EDUCACIO_ZONES_PRIMARIA"
        ]);

        const visibleLayerNames = data.flatMap((group: any) =>
            group.children
                .filter((layer: any) => layer.visible && zonesSet.has(layer.name))
                .map((layer: any) => layer.name)
        );

        // Se obtiene info de las features 
        this.sendMessageToIframe({
            "functionName": "getFeatureInfo",
            "parameters": [
                visibleLayerNames,
                utm,
                "EPSG:25831"
            ]
        })
    }

    step3 = (featuresInfo: any) => {
        const feature = featuresInfo?.features?.[0];

        if (!feature?.geometry?.coordinates) return [];

        const { type, coordinates } = feature.geometry;

        let coords: number[][] = [];

        if (type === "MultiPolygon") {
            // MultiPolygon → [polygon][ring][point]
            coords = coordinates.flatMap((polygon: any) =>
                polygon.flatMap((ring: any) => ring)
            );
        }

        if (type === "Polygon") {
            // Polygon → [ring][point]
            coords = coordinates.flatMap((ring: any) => ring);
        }

        this.sendMessageToIframe({
            "functionName": "selectFeatures",
            "parameters": [
                {
                    "layerName": "EDUCACIO_OFERTA_ESCOLAR",
                    "filter": {},
                    "operator": "OR",
                    "type": "poligon",
                    "geom": coords,
                    "epsg": "EPSG:25831"
                },
                false,
                {
                    "selected": null,
                    "unselected": "#535353"
                },
                {
                    "selected": null,
                    "unselected": "1029011_Test_equipament"
                }
            ]
        })
    };

    inputRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        if (isNaN(value) || value < 1 || value > 10) {
            return;
        }
        this.setState({ radius: isNaN(value) ? 1 : value })
    }

    addresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ address: e.target.value })
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { withCoords, address } = this.state

        if (withCoords) {
            this.sendMessageToIframe({
                "functionName": "getUserLocation",
                "parameters": []
            })
        } else {
            this.sendMessageToIframe(
                {
                    "functionName": "geocode",
                    "parameters": [address]
                }
            )
        }
    }

    toggleWithCoords = () => {
        this.setState((prevState) => ({
            withCoords: !prevState.withCoords
        }))
    }

    clearForm = () => {
        this.setState({ address: "", radius: 1, withCoords: false })
        this.sendMessageToIframe({
            "functionName": "clearSelectedFeatures",
            "parameters": [
                "EDUCACIO_OFERTA_ESCOLAR"
            ]
        })
    }

    render() {
        const { radius, withCoords } = this.state

        return (
            <AccordionItem value="cercadorMoe">
                <AccordionTrigger>
                    Cercador de Oferta Educativa
                </AccordionTrigger>
                <AccordionContent className="border p-4 flex flex-col gap-4">
                    <header>
                        <nav className="flex items-center gap-2">
                            <h3 className="font-semibold">
                                Criteri de proximitat
                            </h3>
                            <InfoIcon size={18} />
                        </nav>
                    </header>
                    <form className="flex flex-col gap-4" onSubmit={this.handleSubmit}>
                        <Field>
                            <FieldLabel htmlFor="block-end-input">Adreca de referencia o codi postal</FieldLabel>
                            <InputGroup className="rounded">
                                <InputGroupInput
                                    disabled={withCoords}
                                    id="block-end-input"
                                    onChange={this.addresChange}
                                    placeholder="Carrer d'Àlaba 5 B" />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        onClick={this.toggleWithCoords}
                                        className={`p-0 min-w-11 border-l-input ${withCoords ? 'text-green-500' : 'text-red-500'}`}>
                                        <GpsFixIcon size={18} />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                            {withCoords && <small className="text-green-500">With user coordinates</small>}
                        </Field>
                        <Field>
                            <FieldLabel>Ràtio de distància</FieldLabel>
                            <FieldDescription className="m-0!">
                                <span className="flex items-center justify-between">
                                    <span>1 km</span>
                                    <span>{radius} km</span>
                                </span>
                            </FieldDescription>
                            <Slider
                                min={1}
                                max={10}
                                step={1}
                                value={[radius]}
                                onValueChange={(value) =>
                                    this.setState({
                                        radius: Array.isArray(value)
                                            ? value[0] ?? 1
                                            : value,
                                    })
                                } />
                            <InputGroup className="rounded max-w-[50%] mt-3">
                                <InputGroupInput max={10} min={1} type="number" value={radius} onChange={this.inputRatioChange} />
                                <InputGroupAddon align="inline-end">km</InputGroupAddon>
                            </InputGroup>
                        </Field>
                        <div className="flex items-center justify-end gap-2">
                            <Button type="submit" disabled={
                                !this.state.address.trim() && !this.state.withCoords}>
                                Buscar
                            </Button>
                            <Button type="button" variant="outline" onClick={this.clearForm}>
                                Limpiar
                            </Button>
                        </div>
                    </form>
                </AccordionContent>
            </AccordionItem>
        )
    }
}

export default CercadorMoeForm