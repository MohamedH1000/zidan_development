"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, Quote,
  List, ListOrdered, Heading1, Heading2, Heading3, Link as LinkIcon,
  AlignLeft, AlignCenter, AlignRight, ImagePlus, Undo2, Redo2, Eraser, Highlighter,
} from "lucide-react";
import { uploadBlogImage } from "@/app/actions/admin-upload";
import { cn } from "@/lib/utils";

const COLORS = ["#0a0a0a", "#c8a45c", "#b8924a", "#dc2626", "#2563eb", "#16a34a", "#9333ea"];

function Btn({
  active, onClick, title, children, disabled,
}: {
  active?: boolean; onClick: () => void; title: string; children: React.ReactNode; disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded text-ink-300 transition-colors hover:bg-white/10 hover:text-cream",
        active && "bg-gold-500/20 text-gold-400",
        disabled && "opacity-30",
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name,
  initialHtml = "",
  dir,
}: {
  name: string;
  initialHtml?: string;
  dir?: "ltr" | "rtl";
}) {
  const [html, setHtml] = useState(initialHtml);
  const [mounted, setMounted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: initialHtml,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  async function onImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadBlogImage(fd);
    if (res.url) editor.chain().focus().setImage({ src: res.url, alt: file.name }).run();
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="rounded-lg border border-white/10 bg-ink-950">
      <input type="hidden" name={name} value={html} />

      {mounted && editor ? (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-white/10 p-2">
          <Btn title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="h-4 w-4" /></Btn>
          <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></Btn>
          <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></Btn>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></Btn>
          <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></Btn>
          <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="h-4 w-4" /></Btn>
          <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></Btn>
          <Btn title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code className="h-4 w-4" /></Btn>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></Btn>
          <Btn title="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></Btn>
          <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></Btn>
          <Btn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code className="h-4 w-4" /></Btn>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <Btn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft className="h-4 w-4" /></Btn>
          <Btn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter className="h-4 w-4" /></Btn>
          <Btn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight className="h-4 w-4" /></Btn>
          <Btn title="Highlight" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}><Highlighter className="h-4 w-4" /></Btn>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <Btn title="Insert link" active={editor.isActive("link")} onClick={() => {
            const prev = editor.getAttributes("link").href ?? "";
            const url = window.prompt("Link URL", prev);
            if (url === null) return;
            if (url === "") editor.chain().focus().extendMarkRange("link").unsetLink().run();
            else editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: "_blank", rel: "noopener noreferrer" }).run();
          }}><LinkIcon className="h-4 w-4" /></Btn>
          <Btn title="Insert image" onClick={() => fileRef.current?.click()}><ImagePlus className="h-4 w-4" /></Btn>
          <Btn title="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}><Eraser className="h-4 w-4" /></Btn>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo2 className="h-4 w-4" /></Btn>
          <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo2 className="h-4 w-4" /></Btn>
          {/* Color swatches */}
          <span className="mx-1 h-5 w-px bg-white/10" />
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              title={`Text color ${c}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().setColor(c).run()}
              className="h-5 w-5 rounded-full border border-white/20"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      ) : null}

      <div className="rte">
        {mounted && editor ? (
          <EditorContent editor={editor} className="rte-content" />
        ) : (
          <div className="min-h-64 p-4 text-sm text-ink-500">Loading editor…</div>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onImageSelected} dir={dir} />
    </div>
  );
}
