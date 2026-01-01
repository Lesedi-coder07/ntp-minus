import { Plus, Star, Trash } from "lucide-react"
import { useState } from "react"

interface BottomBarProps {
  onAddNote: () => void
  onFavoriteNote: () => void
  onDeleteNote: () => void
}

export default function BottomBar({ onAddNote, onFavoriteNote, onDeleteNote }: BottomBarProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null)

  const handleClick = (action: () => void, buttonId: string) => {
    setActiveButton(buttonId)
    action()
    setTimeout(() => setActiveButton(null), 150)
  }

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center gap-3 pb-6 bg-transparent z-50 pointer-events-none hide-in-focus">
      <div 
        className="pointer-events-auto flex items-center gap-1 glass rounded-2xl px-2 py-2 animate-slide-up"
        style={{ animationDelay: '0.1s' }}
      >
        {/* New Note Button */}
        <button
          className={`tooltip btn-micro p-3 rounded-xl transition-all duration-200 group
            ${activeButton === 'add' ? 'scale-95' : ''}
            hover:bg-[var(--hover-bg)] hover:text-[var(--accent)]`}
          aria-label="New note"
          onClick={() => handleClick(onAddNote, 'add')}
          data-tooltip="New note (⌘N)"
        >
          <Plus className={`w-5 h-5 transition-colors duration-200
            ${activeButton === 'add' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}
            group-hover:text-[var(--accent)]`} 
          />
        </button>

        <div className="w-px h-5 bg-[var(--border-light)] mx-1"></div>

        {/* Favorite Button */}
        <button
          className={`tooltip btn-micro p-3 rounded-xl transition-all duration-200 group
            ${activeButton === 'favorite' ? 'scale-95' : ''}
            hover:bg-[var(--hover-bg)] hover:text-[var(--accent)]`}
          aria-label="Favorite"
          onClick={() => handleClick(onFavoriteNote, 'favorite')}
          data-tooltip="Favorite"
        >
          <Star className={`w-5 h-5 transition-colors duration-200
            ${activeButton === 'favorite' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}
            group-hover:text-[var(--accent)]`}
          />
        </button>

        {/* Delete Button */}
        <button
          className={`tooltip btn-micro p-3 rounded-xl transition-all duration-200 group
            ${activeButton === 'delete' ? 'scale-95' : ''}
            hover:bg-red-50 hover:text-red-500`}
          aria-label="Delete"
          onClick={() => handleClick(onDeleteNote, 'delete')}
          data-tooltip="Delete note"
        >
          <Trash className={`w-5 h-5 transition-colors duration-200
            ${activeButton === 'delete' ? 'text-red-500' : 'text-[var(--text-muted)]'}
            group-hover:text-red-500`}
          />
        </button>
      </div>
    </div>
  )
}