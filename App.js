import { useEffect, useState } from "react";
import axios from 'axios'
import './App.css'
const App = () => {
  const [db,setdb] = useState([])
  const [text,settext] = useState("")
  const [backup,setBackup] = useState(db)
  function s(name){
    if(name !== ""){
      setdb([...db.filter(item=>item.name.toLowerCase().includes(name.toLowerCase()))])
    }else{setdb([...backup])}
  }
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => setdb(res.data))
    .catch(err => console.log("err "+ err.data.message))

    
  },[])
  
  
  function delete_item(name){
    setdb([...db.filter(item=>item.name !== name)])
  }
  return(
    <>
    <div className="App">
        <input type="text" placeholder="search your name" onChange={event => s(event.target.value)} />< br /> <br/>
        <input type="text" placeholder="add_it your name" onChange={event => settext(event.target.value)} /> <br />
        <button onClick={()=>setdb([...db,{name:text}])}>submit</button>
        {db.map( (item) => (
          <div className="main">
            <h1>{item.name} <span className="icon"> <button onClick={()=> delete_item(item.name)}>delete</button> </span> </h1>
          </div>
        ) )}
      
        
    </div>
    </>
  )
}
export default App;
