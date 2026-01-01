import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useMemo } from 'react'

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
  onStatsChange?: (stats: { words: number; characters: number }) => void;
}

const TextEditor = ({ currentNote, onContentChange, onStatsChange }: TextEditorProps) => {
  const lastNoteIdRef = useRef<string | null>(null);
  const isUpdatingRef = useRef(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: currentNote?.content?.trim() === '' ? '<p>Start writing...</p>' : (currentNote?.content || '<p>Start writing...</p>'),
    onUpdate: ({ editor }) => {
      if (!isUpdatingRef.current) {
        const html = editor.getHTML();
        onContentChange(html);
      }
    },
  })

  // Calculate word and character count
  const stats = useMemo(() => {
    if (!editor) return { words: 0, characters: 0 };
    const text = editor.getText();
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    return { words, characters };
  }, [editor?.getText()]);

  // Report stats to parent
  useEffect(() => {
    onStatsChange?.(stats);
  }, [stats, onStatsChange]);

  // Update editor content when current note changes
  useEffect(() => {
    if (editor && currentNote) {
      if (lastNoteIdRef.current !== currentNote.id) {
        lastNoteIdRef.current = currentNote.id;
        isUpdatingRef.current = true;
        
        const content = currentNote.content.trim() === '' ? '<p>Start writing...</p>' : currentNote.content;
        editor.commands.setContent(content, false, {
          preserveWhitespace: 'full',
        });
        
        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 100);
      }
    }
  }, [editor, currentNote]);

  const ToolbarButton = ({ 
    onClick, 
    isActive, 
    tooltip, 
    shortcut,
    children 
  }: { 
    onClick: () => void; 
    isActive: boolean; 
    tooltip: string;
    shortcut: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`tooltip btn-micro px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
        isActive
          ? 'bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--hover-border)]'
          : 'bg-transparent text-[var(--text-muted)] border border-transparent hover:bg-[var(--hover-bg)] hover:text-[var(--text-secondary)]'
      }`}
      data-tooltip={`${tooltip} (${shortcut})`}
    >
      {children}
    </button>
  );

  return (
    <div className='min-h-[400px] animate-fade-in-up' style={{ animationDelay: '0.1s' }}>
      {editor && (
        <div className="mb-6 flex items-center gap-1 transition-opacity duration-300 hide-in-focus">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            tooltip="Bold"
            shortcut="⌘B"
          >
            <strong className="font-bold">B</strong>
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            tooltip="Italic"
            shortcut="⌘I"
          >
            <em>I</em>
          </ToolbarButton>

          <div className="w-px h-5 bg-[var(--border-light)] mx-1"></div>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            tooltip="Heading"
            shortcut="⌘⇧1"
          >
            <strong className="font-semibold">H1</strong>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            tooltip="Bullet List"
            shortcut="⌘⇧8"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="9" y1="6" x2="20" y2="6"/>
              <line x1="9" y1="12" x2="20" y2="12"/>
              <line x1="9" y1="18" x2="20" y2="18"/>
              <circle cx="4" cy="6" r="1.5" fill="currentColor"/>
              <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="4" cy="18" r="1.5" fill="currentColor"/>
            </svg>
          </ToolbarButton>
        </div>
      )}
      
      <EditorContent 
        editor={editor} 
        className="w-full min-h-[400px] border-none outline-none text-[var(--text-secondary)] text-base leading-relaxed my-tiptap-editor"
      />

    </div>
  )
}

export default TextEditor