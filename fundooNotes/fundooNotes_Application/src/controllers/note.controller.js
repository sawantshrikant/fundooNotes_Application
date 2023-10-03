import HttpStatus from 'http-status-codes';
import * as noteService from '../services/note.service';


export const createNote = async(req,res) => {
    try {
        
        const data = await noteService.createNote(req.body)

        res.status(HttpStatus.CREATED).json({
            code : HttpStatus.CREATED,
            data : data,
            message : "Note Created Sucessfully"
,        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code : HttpStatus.BAD_REQUEST,
            message : error.message
        })
        
    }
}