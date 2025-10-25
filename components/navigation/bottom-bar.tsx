import { Plus, Star, Trash } from "lucide-react"

export default function BottomBar  ({onAddNote, onFavoriteNote, onDeleteNote}: {onAddNote: () => void, onFavoriteNote: () => void, onDeleteNote: () => void}) {



    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center gap-3 pb-6 bg-transparent z-50 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-[#E5E5E5]">
                <button
                    className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                    aria-label="Add"
                    onClick={onAddNote}
                >
                    <Plus className="w-5 h-5 text-[#666666]" />
                </button>
                <div className="w-px h-6 bg-[#E5E5E5]"></div>
                <button
                    className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                    aria-label="Favorite"
                    onClick={onFavoriteNote}
                >
                    <Star className="w-5 h-5 text-[#666666]" />
                </button>
                <button
                    className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                    aria-label="Delete"
                    onClick={onDeleteNote}
                >
                    <Trash className="w-5 h-5 text-[#666666]" />
                </button>
            </div>
        </div>
    )
}