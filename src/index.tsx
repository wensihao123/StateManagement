import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useObservable } from "./lib/useObservable";
import { store1, Part } from "./store/store1";
import "./style.css";

// const tempItem: Part = {
//   name: "name",
//   id: 123,
//   status: "Checked In",
// };

// store1.add(tempItem);

const Home = () => {
  const parts = useObservable(store1.parts$);
  return (
    <table className="listTable">
      <thead>
        <tr className="tableHead">
          <th id="col1">Name</th>
          <th id="col2">id</th>
          <th id="col3">Status</th>
          <th id="col4">Action</th>
        </tr>
      </thead>
      <tbody>
        {parts.length ? (
          parts.map((item, index) => (
            <tr key={index} className="tableRow">
              <td id="col1">{item.name}</td>
              <td id="col2">{item.id}</td>
              <td id="col3">{item.status}</td>
              <td id="col4">
                <button onClick={() => store1.delete(index)} className="button">
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr className="placeholderRow">
            <td colSpan={4}>No items in list</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const Page1 = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [checked, setChecked] = useState(true);
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const itemToAdd: Part = {
      name: name,
      id: id,
      status: checked ? "Checked In" : "Checked Out",
    };
    store1.add(itemToAdd);
    setName("");
    setId(0);
    setChecked(true);
    alert(`Submitted`);
  };
  return (
    <div className="formWrapper">
      <div className="formTitle">Input Form</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>id:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => {
              const id = parseInt(e.target.value);
              if (!isNaN(id)) setId(id);
            }}
          />
        </div>
        <div>
          <label>status:</label>
          <div>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(true)}
            />
            <label style={{marginRight:10, fontSize:12}}>Checked In</label>
            <input
              type="checkbox"
              checked={!checked}
              onChange={() => setChecked(false)}
            />
            <label style={{fontSize:12}}>Checked Out</label>
          </div>
        </div>
        <div className="submitRow">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <nav className="Navbar">
          <div className="NavTitle">SparesCNX Frontend Test</div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/page1">Page1</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/page1">
            <Page1 />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
