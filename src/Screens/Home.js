import React, { useState } from "react";
import axios from "axios";
import apiURL from "../constants/apiURL";
import { Link, useHistory } from "react-router-dom";
import "./HomePage.css";

//import { Link } from "react-router-dom";

function Home({ socket }) {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");


  const history = useHistory();
  const [roomName, setRoomName] = useState("");
  const [displayName, setDisplayName] = useState("");


  const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname });
    } else {
      alert("username and roomname are must !");
      window.location.reload();
    }
  }; 


  // utility functions :
  function handleDisplayNameChange(e) {
    setDisplayName(e.target.value);
  }

  function handleRoomNameChange(e) {
    setRoomName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Room: ", roomName);
    console.log("Name: ", displayName);

    if (roomName === "" || displayName === "") {
      console.log("Empty value", roomName, displayName);
      return;
    }

    axios
      .post(`${apiURL}/new`, { roomName })
      .then((response) => {
        // Redirect if success
        if (response.status === 201) {
          history.push({
            pathname: `/room/${roomName}`,
            state: { passedInDisplayName: displayName },
          });
        }
      })
      .catch((error) => {
        console.log("Exception on POST request: ", error);
      });
  }

 

  return (
    <div className="outer">
      <div className="homepage">
        <h1 className="heading"> Code-N-Collab</h1>
        <p className="para">
          Realtime Collaborate Editor with Embedded Compiler with voice chat and
          collaborative whiteboard
        </p>
        <input
          placeholder="Input your user name"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        ></input>
        <input
          placeholder="Input the room name"
          value={roomname}
          onChange={(e) => setroomname(e.target.value)}
        ></input>
        <Link to={`/chat/${roomname}/${username}`}>
          <button onClick={sendData}>Join</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
