import React,{useContext} from 'react'
import noteContext from '../Contexts/NotesContexts/noteContext'

function NoteItem(props) {
    const { notes } = props
    let {deleteNote}= useContext(noteContext);
    return (
        <div className='col-md-3 my-2'>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <i className="fa-solid fa-pen-to-square"/> 
                    <i className="fa-solid fa-trash mx-3" onClick={()=> {return deleteNote(notes._id)}} /> 
                </div>
            </div>
        </div>
    )
}

export default NoteItem