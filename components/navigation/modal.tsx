import { useState , useEffect, ReactEventHandler} from "react";

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function SpotlightModal({ notes, onClose, onNoteSelect }: {notes: Note[], onClose: () => void, onNoteSelect?: (note: Note) => void}) {
  const [query, setQuery] = useState("");

  // Filter notes by title/content
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.content.toLowerCase().includes(query.toLowerCase())
  );

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { 
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-6 py-5 w-full max-w-xl transition-all duration-200">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-[#999999] hover:text-[#333333] transition-colors duration-150 p-1.5 rounded-lg hover:bg-[#F5F5F5] focus:outline-none"
          onClick={onClose}
          aria-label="Close search"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        {/* Search Input */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#999999]">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M15 15l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <input
            className="w-full bg-transparent outline-none text-xl placeholder:text-[#999999] font-medium px-1 text-[#333333]"
            placeholder="Search notes..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        {/* Results List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotes.length === 0 && (
            <div className="text-[#999999] text-center py-12 select-none">
              <span className="inline-block mb-3">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 10h.01M15 10h.01M9.5 15c1.333.667 2.667.667 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <div className="text-base font-medium">No notes found</div>
            </div>
          )}
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className="group p-3 mb-2 rounded-xl bg-[#F5F5F5] border border-transparent hover:border-[#A7D9ED] hover:bg-[#E0F2F7] cursor-pointer transition-all duration-150 shadow-sm"
              onClick={() => onNoteSelect?.(note)}
              tabIndex={0}
              role="button"
              aria-label={`Select note: ${note.title}`}
            >
              <div className="font-semibold text-base text-[#333333] group-hover:text-[#333333] truncate">
                {note.title}
              </div>
              {note.content && (
                <div className="text-sm text-[#999999] mt-1 line-clamp-1">
                  {note.content.replace(/<[^>]*>/g, '').substring(0, 60)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
