import {React, useContext, useEffect} from 'react'
import NoteContext from '../Contexts/NotesContexts/noteContext'

function About() {
  const noteContext = useContext(NoteContext)
 
useEffect(() => {
  noteContext.update();
   // eslint-disable-next-line
}, [])


  return (
    <div>{noteContext.state.name} is studying in {noteContext.state.class}</div>
  )
}

export default About