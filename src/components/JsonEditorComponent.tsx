import { useEffect, useRef, useState } from "react";
import JSONEditor from "jsoneditor";
import type { JSONEditorMode } from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import { Button } from "./ui/button";

export default function JsonEditorComponent({ value, onChange }: { value: any, onChange: (updated: any) => void }) {
  const [mode, setMode] = useState<JSONEditorMode>("code");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<JSONEditor | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    editorRef.current = new JSONEditor(containerRef.current, {
      mode: mode,
      modes: ["tree", "code", "preview", "text", "form", "view"], // opciones disponibles
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
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [mode]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.update(value);
    }
  }, [value]);

  return (
    <div ref={containerRef} className="flex-1">
      <div className="grid grid-cols-2">
        <Button type="button" size="sm" variant={mode === "tree" ? "secondary" : "ghost"} onClick={() => setMode("tree")}>Tree</Button>
        <Button type="button" size="sm" variant={mode === "code" ? "secondary" : "ghost"} onClick={() => setMode("code")}>Code</Button>
      </div>
    </div>
  );
}