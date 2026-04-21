

export default function VisorSelector({ 
    onChange, 
    defaultValue 
}: { onChange?: (value: string) => void, defaultValue?: string }) {

    return (
        <select defaultValue={defaultValue} onChange={(e) => onChange?.(e.target.value)}>
            <option value="https://pre.sig.gencat.cat/visorHipermapa/?ID=1">Visor Hipermapa PRE</option>
            <option value="https://pre.sig.gencat.cat/visorEvolutiuTest2/index.html?ID=122362">Visor POI MOE</option>
            <option value="https://pre.sig.gencat.cat/visorEvolutiuTest2/index.html?ID=121962">Equipaments</option>
            <option value="http://localhost:3000/?ID=122362">Localhost MOE</option>
        </select>
    );
}