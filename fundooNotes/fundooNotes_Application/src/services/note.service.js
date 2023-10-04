
import Note from "../models/note.model";

export const createNote = (data) => {
    try {
        const note = Note.create(data);
        return note
    } catch (error) {
        throw error
    }
    
}