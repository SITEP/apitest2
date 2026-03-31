import { useState } from "react";
import JsonEditorComponent from "./JsonEditorComponent";
import { Button } from "./ui/button";


export default function DynamicApiForm({
    initialFormData,
    onSubmit,
    buildParams,
    submitLabel = "Ejecutar"
}: {
    initialFormData?: any;
    onSubmit: any;
    buildParams?: any;
    submitLabel?: string;
}) {

    const hasPayload = !!initialFormData;

    const [formData, setFormData] = useState(initialFormData || {});

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Caso sin parámetros
        if (!hasPayload) {
            onSubmit([]);
            return;
        }

        // Caso con builder personalizado
        if (buildParams) {
            onSubmit(buildParams(formData));
            return;
        }

        // Fallback genérico
        onSubmit([formData]);
    };

    return (
        <form onSubmit={handleSubmit} className="advanced-filter-form form-full">

            {/* JSON editor solo si hay payload */}
            {hasPayload && (
                <JsonEditorComponent
                    value={formData}
                    onChange={(updated) => setFormData(updated)}
                />
            )}

            {/* CONTROLES DINÁMICOS */}
            {hasPayload && (
                <div className="flex flex-wrap gap-2 justify-between">
                    {/* EPSG */}
                    {"epsg" in formData && (
                        <select
                            className="aff-input"
                            value={formData.epsg}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    epsg: e.target.value
                                }))
                            }
                        >
                            <option value="EPSG:25831">EPSG:25831</option>
                            <option value="EPSG:3857">EPSG:3857</option>
                            <option value="EPSG:4326">EPSG:4326</option>
                        </select>
                    )}

                    {/* Operator */}
                    {"operator" in formData && (
                        <label className="flex items-center">
                            Operator
                            <select
                                value={formData.operator}
                                onChange={(e) =>
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        operator: e.target.value
                                    }))
                                }
                            >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>
                        </label>
                    )}

                    {/* Condition Operator */}
                    {"conditionOperator" in formData && (
                        <label className="flex items-center">
                            <select
                                className="aff-input"
                                value={formData.conditionOperator}
                                onChange={(e) =>
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        conditionOperator: e.target.value
                                    }))
                                }
                            >
                                <option value="= value">= value · És igual a</option>
                                <option value="<> value">&lt;&gt; value · És diferent a</option>
                                <option value="> value">&gt; value · És major que</option>
                                <option value="< value">&lt; value · És menor que</option>
                                <option value=">= value">&gt;= value · És major o igual que</option>
                                <option value="<= value">&lt;= value · És menor o igual que</option>
                                <option value="IS NULL">IS NULL · No té valor</option>
                                <option value="IS NOT NULL">IS NOT NULL · Té valor</option>
                                <option value="ILIKE 'value'">ILIKE 'value' · És igual a</option>
                                <option value="ILIKE 'value%25'">ILIKE 'value%25' · Comença per</option>
                                <option value="ILIKE '%25value'">ILIKE '%25value' · Acaba per</option>
                                <option value="ILIKE '%25value%25'">ILIKE '%25value%25' · Conté</option>
                                <option value="NOT ILIKE '%25value%25'">NOT ILIKE '%25value%25' · No conté</option>
                            </select>
                        </label>
                    )}

                    {/* Geometry Type */}
                    {"type" in formData && (
                        <label className="flex items-center">
                            Type
                            <select
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        type: e.target.value
                                    }))
                                }
                            >
                                <option value="cercle">Cercle</option>
                                <option value="poligon">Poligon</option>
                                <option value="bbox">Bbox</option>
                            </select>
                        </label>
                    )}

                    {/* Tab */}
                    {"tab" in formData && (
                        <label className="flex items-center">
                            Tab
                            <select
                                className="aff-input"
                                value={formData.operator}
                                onChange={(e) =>
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        tab: e.target.value
                                    }))
                                }
                            >
                                <option value="">Auto</option>
                                <option value="capes">Capes</option>
                                <option value="elements">Elements de capes</option>
                                <option value="localitzacions">Localitzacions</option>
                            </select>
                        </label>
                    )}

                    {/* Mode Fitxa */}
                    {"modeFitxa" in formData && (
                        <label className="flex items-center">
                            Mode Fitxa
                            <select
                                value={formData.modeFitxa}
                                onChange={(e) =>
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        modeFitxa: e.target.value
                                    }))
                                }
                            >
                                <option value="false">Sense fitxa</option>
                                <option value="true">Amb fitxa</option>
                            </select>
                        </label>
                    )}

                    {/* draw type */}
                    {"drawType" in formData && (
                        <label className="flex items-center">
                            Type
                            <select
                                value={formData.drawType}
                                onChange={(e) =>
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        drawType: e.target.value
                                    }))
                                }
                            >
                                <option value="punt">Punto</option>
                                <option value="linia">Línea</option>
                                <option value="lliure">Línea libre</option>
                                <option value="poligon">Polígono</option>
                                <option value="lliurePoligon">Polígono libre</option>
                                <option value="cercle">Círculo</option>
                                <option value="text">Texto</option>
                                <option value="borrar">Borrar</option>
                                <option value="editStyle">Editar estilo</option>
                            </select>
                        </label>
                    )}

                    {/* Draw Style Color */}
                    {formData?.drawStyle && "color" in formData.drawStyle && (
                        <label className="flex items-center">
                            Color
                            <input
                                type="color"
                                value={formData.drawStyle.color}
                                style={{ width: 24, height: 24, padding: 2, cursor: "pointer", borderRadius: 4 }}
                                onChange={(e) =>
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        drawStyle: {
                                            ...prev.drawStyle,
                                            color: e.target.value
                                        }
                                    }))
                                }
                            />
                        </label>
                    )}

                    {/* Border Type */}
                    {formData?.drawStyle && "borderType" in formData.drawStyle && (
                        <label className="flex items-center">
                            Border
                            <select
                                className="aff-input"
                                value={formData.drawStyle.borderType}
                                onChange={(e) =>
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        drawStyle: {
                                            ...prev.drawStyle,
                                            borderType: e.target.value
                                        }
                                    }))
                                }
                            >
                                <option value="solid">Solid</option>
                                <option value="dotted">Dotted</option>
                                <option value="dashed">Dashed</option>
                                <option value="dashdot">Dashdot</option>
                            </select>
                        </label>
                    )}
                </div>
            )}

            <Button className="w-full" type="submit">
                {submitLabel}
            </Button>

        </form >
    );
}