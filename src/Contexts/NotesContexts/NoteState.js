import { useState } from "react";
import  NoteContext  from "./noteContext";

const NoteState = (props)=>{
    const s1 = {
        name:"mohan",
        class:"8b"
    }
    const [state, setState] = useState(s1)
    const update = ()=>{
        setTimeout(() => {
            setState({
                name:"krishna",
                class:"10b"
            })
        }, 2000);
    }

    return(
        // state:state ,update:update
        <NoteContext.Provider value={{state ,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState