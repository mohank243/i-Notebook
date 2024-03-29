import React,{useContext, useState} from 'react'
import noteContext from '../Contexts/NotesContexts/noteContext'
import alertContext from "../Contexts/AlertContexts/alertContext";

function AddNote() {
const context = useContext(noteContext);
const [note, setNote] = useState({title:"", description:"",tag:""})
  const {addNote} = context;
  let {showAlert}= useContext(alertContext);
    const handleOnClick= (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"",tag:""});
        showAlert('success' ,'Note Added Successfully')
    }
    const onChange= (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className='container'>
            <h1>Add a Note</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
            </form>
        </div>
        </div>
    )
}

export default AddNote