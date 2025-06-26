import { useState , useEffect, ReactEventHandler} from "react";


interface note {
    title: string;
    content: string
    id: string
}

export default function SpotlightModal({ notes,  onClose }: {notes: note[], onClose: () => void}) {
  const [query, setQuery] = useState("");

  // Filter notes by title/content
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.content.toLowerCase().includes(query.toLowerCase())
  );

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative bg-white/90 dark:bg-neutral-900/90 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 px-8 py-7 w-full max-w-xl transition-all duration-200">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-neutral-400 hover:text-blue-500 transition-colors duration-150 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={onClose}
          aria-label="Close search"
        >
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {/* Search Input */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-blue-400">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 15l-2.5-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <input
            className="w-full bg-transparent outline-none text-2xl placeholder:text-neutral-400 font-semibold px-1"
            placeholder="Search notes…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        {/* Results List */}
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {filteredNotes.length === 0 && (
            <div className="text-neutral-400 text-center py-10 text-lg select-none">
              <span className="inline-block mb-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 10h.01M15 10h.01M9.5 15c1.333.667 2.667.667 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <div>No notes found.</div>
            </div>
          )}
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className="group p-4 mb-2 rounded-xl bg-white/70 dark:bg-neutral-800/70 border border-transparent hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer transition-all duration-150 shadow-sm"
              // onClick={() => { /* handle note selection */ }}
              tabIndex={0}
              role="button"
              aria-label={`Select note: ${note.title}`}
            >
              <div className="font-bold text-lg text-neutral-800 dark:text-neutral-100 group-hover:text-blue-700 truncate">
                {note.title}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 truncate">
                {note.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
