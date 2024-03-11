import AddNote from "./AddNote"
import Notes from "./Notes"


function Home() {
  
  return (
    <>
      <div className="container my-2">
          <AddNote/>
          <Notes/>
      </div>
       
      
    </>
  )
}

export default Home