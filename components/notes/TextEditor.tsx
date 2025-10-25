import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef } from 'react'

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TextEditorProps {
  currentNote: Note | null;
  onContentChange: (content: string) => void;
}

const TextEditor = ({ currentNote, onContentChange }: TextEditorProps) => {
        const lastNoteIdRef = useRef<string | null>(null);
        const isUpdatingRef = useRef(false);

        const editor = useEditor({
          extensions: [StarterKit],
          content: currentNote?.content?.trim() === '' ? '<p>Start writing...</p>' : (currentNote?.content || '<p>Start writing...</p>'),
          onUpdate: ({ editor }) => {
            // Only trigger onContentChange if we're not programmatically updating
            if (!isUpdatingRef.current) {
              const html = editor.getHTML();
              onContentChange(html);
            }
          },
        })

        // Update editor content when current note changes
        useEffect(() => {
          if (editor && currentNote) {
            // Only update if the note ID has changed (different note selected)
            if (lastNoteIdRef.current !== currentNote.id) {
              lastNoteIdRef.current = currentNote.id;
              isUpdatingRef.current = true;
              
              // If content is empty, show placeholder, otherwise show the content
              const content = currentNote.content.trim() === '' ? '<p>Start writing...</p>' : currentNote.content;
              editor.commands.setContent(content, false, {
                preserveWhitespace: 'full',
              });
              
              // Reset the flag after content is set
              setTimeout(() => {
                isUpdatingRef.current = false;
              }, 100);
            }
          }
        }, [editor, currentNote]);
    return (<div className='min-h-[400px]'>
          {editor && (
  <div className="mb-6 flex gap-2 opacity-10 hover:opacity-100 transition-opacity duration-200">
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={`px-3 py-1.5 rounded-lg  text-sm font-medium transition-all duration-150 ${
        editor.isActive('bold')
          ? 'bg-[#E0F2F7] text-[#333333] border border-[#A7D9ED]'
          : 'bg-transparent text-[#666666] border border-transparent hover:bg-[#F5F5F5]'
      }`}
      title="Bold"
    >
      <strong className="font-semibold ">B</strong>
    </button>
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium  transition-all duration-150 ${
        editor.isActive('italic')
          ? 'bg-[#E0F2F7] text-[#333333] border border-[#A7D9ED] italic'
          : 'bg-transparent text-[#666666] border border-transparent hover:bg-[#F5F5F5] italic'
      }`}
      title="Italic"
    >
      I
    </button>
    <div className="w-px h-6 bg-[#E5E5E5]"></div>
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
        editor.isActive('heading', { level: 1 })
          ? 'bg-[#E0F2F7] text-[#333333] border border-[#A7D9ED]'
          : 'bg-transparent text-[#666666] border border-transparent hover:bg-[#F5F5F5]'
      }`}
      title="Heading"
    >
      <strong className="font-semibold">H1</strong>
    </button>
  </div>
)}
          <EditorContent editor={editor} className="w-full min-h-[400px] border-none outline-none text-[#666666] text-base leading-relaxed my-tiptap-editor"/>


    </div>)
}

export default TextEditor