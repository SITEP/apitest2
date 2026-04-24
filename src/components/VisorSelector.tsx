import { useAppContext } from "../context/AppContext";

type VisorOption = {
    id: string;
    label: string;
    value: string;
    token: string;
}

export default function VisorSelector({
    onChange,
    defaultValue
}: { onChange?: (value: string) => void, defaultValue?: string }) {

    const { setVisorToken } = useAppContext();

    const isProduction = import.meta.env.PROD;
    const options: VisorOption[] = [
        {
            id: "1",
            label: "Visor Hipermapa PRE",
            value: "https://pre.sig.gencat.cat/visorHipermapa/?ID=1",
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LzIiLCJpYXQiOjE3MTgwMjY4NTB9.-1enTeVcqnqeAopYHAPEajX85_Q60T2pQZeU7NWr3Tc3"
        },
        {
            id: "122362",
            label: "Visor POI MOE",
            value: "https://pre.sig.gencat.cat/visorEvolutiuTest2/index.html?ID=122362",
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL3ByZS5zaWcuZ2VuY2F0LmNhdC9hcGl0ZXN0Mi9pbmRleC5odG1sLzEyMjM2MiIsImlhdCI6MTc3NjY3NDUyMX0.DvtFPZvyVUuTN-T0bvBCZaOWKJKZzeE5rFAC0UVwmmo"
        },
        {
            id: "122362-local",
            label: "Localhost MOE",
            value: "http://localhost:3000/?ID=122362",
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL3ByZS5zaWcuZ2VuY2F0LmNhdC9hcGl0ZXN0Mi9pbmRleC5odG1sLzEyMjM2MiIsImlhdCI6MTc3NjY3NDUyMX0.DvtFPZvyVUuTN-T0bvBCZaOWKJKZzeE5rFAC0UVwmmo"
        }
    ]

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedOption = options.find(opt => opt.value === e.target.value);
        if (selectedOption) {
            onChange?.(selectedOption.value);
            setVisorToken(selectedOption.token);
        }
    }

    return (
        <select defaultValue={defaultValue} onChange={handleChange}>
            {options.map(opt => {
                if (isProduction && opt.id === "122362-local") return null; // No mostrar opción local en producción
                return <option key={opt.id} value={opt.value}>{opt.label}</option>
            })}
        </select>
    );
}