import { useState,useContext } from "react";
import alertContext from "../AlertContexts/alertContext";
import  NoteContext  from "./noteContext";

const NoteState = (props)=>{
    const hostName = "http://localhost:5000";
    const intialNotes = []
    let {showAlert}= useContext(alertContext);

      const getAllNotes = async ()=>{
        const response = await fetch(hostName+'/api/notes/fetchallnotes', {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("jwttoken")
          },
         
        });
        const json=  await response.json(); // parses JSON response into native JavaScript objects
        setNotes(json);
        console.log(json)

      }

      //Add a Note
      const addNote = async (title, description, tag)=>{
        const response = await fetch(`${hostName}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("jwttoken")
          },
         
          body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
         const note = await response.json(); 

        setNotes(notes.concat(note));
      }

      //Delete a Note
      const deleteNote = async (id)=>{
        const response = await fetch(`${hostName}/api/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("jwttoken")
          },
        
        });
        const note = await response.json(); 
        console.log(note)
        const newNotes = notes.filter((note)=>note._id!==id)
        setNotes(newNotes)
        showAlert('success' ,'Note Deleted Successfully')

      } 

      //Edit a Note

      const editNote = async(id, title, description, tag) =>{
        const response = await fetch(`${hostName}/api/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("jwttoken")
          },
         
          body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
         
        });
        const note = await response.json(); 
        console.log(note)
        const newNotes = JSON.parse(JSON.stringify(notes))//deepcopy of notes object i.e the noteObject had updated but not rendered becuase it state not updated
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title = title
            newNotes[index].description = description
            newNotes[index].tag = tag
            break;
          }
          
        }
        setNotes(newNotes);
        // getAllNotes();
      }
    const [notes, setNotes] = useState(intialNotes)
    

    return(
        // state:state ,update:update
        <NoteContext.Provider value={{notes, addNote ,deleteNote, editNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState