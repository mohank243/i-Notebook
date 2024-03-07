import { useState } from "react";
import  NoteContext  from "./noteContext";

const NoteState = (props)=>{
    const hostName = "http://localhost:5000";
    const intialNotes = []

      const getAllNotes = async ()=>{
        const response = await fetch(hostName+'/api/notes/fetchallnotes', {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMThiNWNiNGQ1YTMzZWMzYTAyYTFkIn0sImlhdCI6MTcwOTQ1Mjg3M30.VrrX7DPLv6NAqZCj6HofUuTXCfLyJB60nVxzTgb_W2I"
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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMThiNWNiNGQ1YTMzZWMzYTAyYTFkIn0sImlhdCI6MTcwOTQ1Mjg3M30.VrrX7DPLv6NAqZCj6HofUuTXCfLyJB60nVxzTgb_W2I"
          },
         
          body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
         const note = response.json(); 

      //  const note=  {
      //     "_id": "65e42dd428b4485f3b783426",
      //     "user": "65e18b5cb4d5a33ec3a02a1d",
      //     "title": title,
      //     "description": description,
      //     "tag": tag,
      //     "date": "2024-03-03T07:59:16.161Z",
      //     "__v": 0
      //   }

        setNotes(notes.concat(note));
      }

      //Delete a Note
      const deleteNote = (id)=>{
        const newNotes = notes.filter((note)=>note._id!==id)
        setNotes(newNotes)
      } 

      //Edit a Note

      const editNote =(id, title, description, tag) =>{
        
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id===id){
            element.title = title
            element.description = description
            element.tag = tag
          }
          
        }
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