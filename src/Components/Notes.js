import React,{useContext,useEffect} from 'react'
import noteContext from '../Contexts/NotesContexts/noteContext'
import NoteItem from './NoteItem';

function Notes() {
const context = useContext(noteContext);
  const {notes,getAllNotes} = context;
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className=" container row my-3">
    <h2>View Notes</h2>
    {notes.map((note)=>{
      return <NoteItem key={note._id} notes={note}/>
    })}
    </div>
  )
}

export default Notes