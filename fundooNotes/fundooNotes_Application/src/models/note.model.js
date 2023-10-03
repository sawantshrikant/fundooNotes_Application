
import { Schema , model } from "mongoose";

const noteSchema = new  Schema ( {
    name : {
        type : String,
        
        
    },

    description : {
        type : String
    }

})

const Note = model('Note', noteSchema)

export default Note