"use client";

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Heading2,
    List,
    ListOrdered,
    Link as LinkIcon
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

import { Button } from "@/components/ui/button";

import "./tiptap-editor.css";

interface TipTapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export const TipTapEditor = ({ content, onChange, placeholder = "Type '/' for commands or start typing..." }: TipTapEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-400 underline hover:text-blue-300 cursor-pointer",
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose prose-invert prose-slate max-w-none focus:outline-none min-h-[400px] text-slate-300 leading-relaxed",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="border border-slate-700/50 rounded-lg overflow-hidden bg-slate-900/30">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-slate-700/50 bg-slate-800/30 flex-wrap">
                {/* Bold */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`h-8 w-8 p-0 hover:bg-slate-700/50 ${editor.isActive("bold") ? "bg-slate-700 text-white" : "text-slate-400"
                        }`}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>

                {/* Italic */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`h-8 w-8 p-0 hover:bg-slate-700/50 ${editor.isActive("italic") ? "bg-slate-700 text-white" : "text-slate-400"
                        }`}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>

                {/* Underline */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`h-8 w-8 p-0 hover:bg-slate-700/50 ${editor.isActive("strike") ? "bg-slate-700 text-white" : "text-slate-400"
                        }`}
                    title="Strikethrough"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-slate-700/50 mx-1" />

                {/* Heading */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`h-8 w-8 p-0 hover:bg-slate-700/50 ${editor.isActive("heading", { level: 2 }) ? "bg-slate-700 text-white" : "text-slate-400"
                        }`}
                    title="Heading"
                >
                    <Heading2 className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-slate-700/50 mx-1" />

                {/* Bullet List */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`h-8 w-8 p-0 hover:bg-slate-700/50 ${editor.isActive("bulletList") ? "bg-slate-700 text-white" : "text-slate-400"
                        }`}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </Button>

                {/* Ordered List */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`h-8 w-8 p-0 hover:bg-slate-700/50 ${editor.isActive("orderedList") ? "bg-slate-700 text-white" : "text-slate-400"
                        }`}
                    title="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-slate-700/50 mx-1" />

                {/* Link */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={setLink}
                    className={`h-8 w-8 p-0 hover:bg-slate-700/50 ${editor.isActive("link") ? "bg-slate-700 text-white" : "text-slate-400"
                        }`}
                    title="Add Link"
                >
                    <LinkIcon className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor Content */}
            <div className="p-4">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};
