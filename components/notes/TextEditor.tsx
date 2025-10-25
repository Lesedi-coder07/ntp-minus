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

        const editor = useEditor({
          extensions: [StarterKit],
          content: currentNote?.content?.trim() === '' ? '<p>Start writing...</p>' : (currentNote?.content || '<p>Start writing...</p>'),
          onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onContentChange(html);
          },
        })

        // Update editor content when current note changes
        useEffect(() => {
          if (editor && currentNote) {
            // Only update if the note ID has changed (different note selected)
            if (lastNoteIdRef.current !== currentNote.id) {
              lastNoteIdRef.current = currentNote.id;
              // If content is empty, show placeholder, otherwise show the content
              const content = currentNote.content.trim() === '' ? '<p>Start writing...</p>' : currentNote.content;
              editor.commands.setContent(content);
            }
          }
        }, [editor, currentNote]);
    return (<div className='h-full'>
          
          {editor && (
  <div className="mb-2 flex gap-2">
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={`px-3 py-1 rounded-md border transition-colors duration-150 text-sm font-semibold flex items-center gap-1
        ${editor.isActive('bold')
          ? 'bg-amber-400 text-white border-amber-400 shadow font-bold'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-amber-100 hover:border-amber-300'}
      `}
      title="Bold"
    >
      <strong>B</strong>
    </button>
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`px-3 py-1 rounded-md border transition-colors duration-150 text-sm font-semibold flex items-center gap-1
        ${editor.isActive('italic')
          ? 'bg-amber-400 text-white border-amber-400 shadow italic'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-amber-100 hover:border-amber-300'}
      `}
      title="Italic"
    >
      <span className="italic">I</span>
    </button>
  

    {/* <button
      type="button"
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={editor.isActive('heading', { level: 1 }) ? 'font-bold text-2xl' : ''}
    >
      H1
    </button> */}
    {/* Add more buttons as needed */}
  </div>
)}
          <EditorContent editor={editor} className="w-full  h-[90%] border-none outline-none ml-3 text-neutral-600 my-tiptap-editor"/>


    </div>)
}

export default TextEditor