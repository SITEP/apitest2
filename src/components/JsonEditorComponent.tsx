import { useEffect, useRef, useState, useMemo } from "react";
import JSONEditor from "jsoneditor";
import type { JSONEditorMode } from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import { Button } from "./ui/button";

const MAX_JSON_SIZE = 300_000; // 300KB aprox (ajústalo)

export default function JsonEditorComponent({
  value,
  onChange,
  defaultMode
}: {
  value: any;
  onChange: (updated: any) => void;
  defaultMode?: JSONEditorMode;
}) {
  const [mode, setMode] = useState<JSONEditorMode>(defaultMode || "code");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<JSONEditor | null>(null);

  // 🔍 calcular tamaño del JSON
  const jsonSize = useMemo(() => {
    try {
      return JSON.stringify(value).length;
    } catch {
      return 0;
    }
  }, [value]);
  
  const isTooLargeForCode = jsonSize > MAX_JSON_SIZE;

  useEffect(() => {
    if (!containerRef.current) return;

    editorRef.current = new JSONEditor(containerRef.current, {
      mode: mode,
      modes: ["tree", "code", "preview", "text", "form", "view"],
      navigationBar: false,
      statusBar: false,
      mainMenuBar: false,

      onChange: () => {
        try {
          const updated = editorRef.current?.get();
          onChange(updated);
        } catch {
          // JSON inválido en modo code
        }
      }
    });

    editorRef.current.set(value);

    if (mode === "code" && editorRef.current.aceEditor) {
      editorRef.current.aceEditor.setOptions({
        maxLines: Infinity
      });
    }

    return () => {
      editorRef.current?.destroy();
    };
  }, [mode]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.update(value);
    }
  }, [value]);

  // 🚫 evitar que se quede en modo code si cambia el tamaño
  useEffect(() => {
    if (isTooLargeForCode && mode === "code") {
      setMode("tree");
    }
  }, [isTooLargeForCode]);

  return (
    <div ref={containerRef} className="flex-1">
      <div className="grid grid-cols-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "tree" ? "secondary" : "ghost"}
          onClick={() => setMode("tree")}
        >
          Tree
        </Button>

        <Button
          type="button"
          size="sm"
          variant={mode === "code" ? "secondary" : "ghost"}
          onClick={() => {
            if (!isTooLargeForCode) setMode("code");
          }}
          disabled={isTooLargeForCode}
        >
          Code
        </Button>
      </div>

      {/* Opcional: aviso UX */}
      {isTooLargeForCode && (
        <div className="text-xs text-red-500 mt-1">
          JSON demasiado grande para modo código
        </div>
      )}
    </div>
  );
}