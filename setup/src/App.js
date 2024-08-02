import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      //deal with edit
    } else {
      //show alert
      showAlert(true,'success','Successfully Added ')
      const newList = { id: new Date().getTime().toString(), title: name };
      setList([...list, newList]);
      setName("");
    }
    console.log("hello");
  };

  const showAlert=(show=false, type="", msg="")=>{
    setAlert({show, type,msg});
  }

  const clearList=()=>{
    showAlert(true,'danger','List is cleared');
    setList([])
  }

  const removeItem=(id)=>{
    showAlert(true,'danger','item removed');
    setList(list.filter((item)=>item.id!==id))
  }

  return (
    <section className="section-center">
      <form action="" className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}

        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg. Banana"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removedItem={removeItem} list={list} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
