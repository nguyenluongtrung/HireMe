"use client";

import { useParams } from "next/navigation";
import { NoteEditor } from "@/components/features/knowledge-hub/NoteEditor";

export default function KnowledgeItemPage() {
    const { "item-id": itemId } = useParams<{ "item-id": string }>();

    return (
        <NoteEditor noteId={Number(itemId)} />
    );
}
