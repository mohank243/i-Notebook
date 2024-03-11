import React ,{useContext} from 'react'
import alertContext from "../Contexts/AlertContexts/alertContext";


export default function Alert() {


    let {alert }=  useContext(alertContext);
  return (
    // probs.alert will evaluate first if it is null then Right Hand side will not evaluate
    // if it is not null then only right hand side will evaluate
   <div style={{height : '50px'}}>
    {alert && <div>
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{alert.type}</strong> : {alert.message}
        </div>
    </div>}

    </div>
  )
}
