import React, {useState} from 'react';
import AlertContext from "./alertContext";

function AlertState(props) {
const [alert, setAlert] = useState(null);
let showAlert = (type , message) =>{
    setAlert({
      type : type,
      message : message
    })
    setTimeout(() => {
      setAlert(null);
  }, 1500);
  }
  return (
    <AlertContext.Provider value={{showAlert, alert}}>
            {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState