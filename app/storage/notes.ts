export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const STORAGE_KEY = 'ntp-notes';
const CURRENT_NOTE_KEY = 'ntp-current-note';

export const notesStorage = {
  // Get all notes from localStorage
  getAll(): Note[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const notes = JSON.parse(stored);
      return notes.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
      }));
    } catch (error) {
      console.error('Error loading notes from localStorage:', error);
      return [];
    }
  },

  // Save all notes to localStorage
  saveAll(notes: Note[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes to localStorage:', error);
    }
  },

  // Get a specific note by ID
  getById(id: string): Note | null {
    const notes = this.getAll();
    return notes.find(note => note.id === id) || null;
  },

  // Save or update a note
  save(note: Note): void {
    const notes = this.getAll();
    const existingIndex = notes.findIndex(n => n.id === note.id);
    
    if (existingIndex >= 0) {
      notes[existingIndex] = note;
    } else {
      notes.push(note);
    }
    
    this.saveAll(notes);
  },

  // Delete a note
  delete(id: string): void {
    const notes = this.getAll();
    const filteredNotes = notes.filter(note => note.id !== id);
    this.saveAll(filteredNotes);
  },

  // Get current note ID
  getCurrentNoteId(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem(CURRENT_NOTE_KEY);
    } catch (error) {
      console.error('Error getting current note ID:', error);
      return null;
    }
  },

  // Set current note ID
  setCurrentNoteId(id: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CURRENT_NOTE_KEY, id);
    } catch (error) {
      console.error('Error setting current note ID:', error);
    }
  },

  // Get current note
  getCurrentNote(): Note | null {
    const currentId = this.getCurrentNoteId();
    if (!currentId) return null;
    return this.getById(currentId);
  },

  // Create a new note
  createNew(title: string = 'New Note', content: string = ''): Note {
    const now = new Date();
    const newNote: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      content,
      createdAt: now,
      updatedAt: now
    };
    
    this.save(newNote);
    this.setCurrentNoteId(newNote.id);
    return newNote;
  },

  // Update note content
  updateContent(id: string, content: string): void {
    const note = this.getById(id);
    if (note) {
      note.content = content;
      note.updatedAt = new Date();
      this.save(note);
    }
  },

  // Update note title
  updateTitle(id: string, title: string): void {
    const note = this.getById(id);
    if (note) {
      note.title = title;
      note.updatedAt = new Date();
      this.save(note);
    }
  }
};
