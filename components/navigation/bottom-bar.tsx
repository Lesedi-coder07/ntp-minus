import { Plus, Star, Trash } from "lucide-react"

export default function BottomBar  ({onAddNote, onFavoriteNote, onDeleteNote}: {onAddNote: () => void, onFavoriteNote: () => void, onDeleteNote: () => void}) {



    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center gap-4 pb-7 bg-transparent z-50">
            <button
                className=" group p-2 rounded hover:bg-neutral-100  dark:hover:bg-neutral-800 transition-colors"
                aria-label="Add"
                onClick={onAddNote}
            >
                <Plus className="w-5 h-5 text-black group-hover:text-white" />
            </button>
            <button
                className="p-2 group rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Favorite"
            >
                <Star className="w-5 h-5 text-black group-hover:text-white" />
            </button>
            <button
                className="p-2 rounded group hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Delete"
            >
                <Trash className="w-5 h-5 text-black group-hover:text-white" />
            </button>
        </div>
    )
}