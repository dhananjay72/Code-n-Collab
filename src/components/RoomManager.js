import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { snippets } from "../constants/snippets";
import TextEditor from "../components/TextEditor";
import Whiteboard from "../components/Whiteboard";
import ParticipantList from "../components/ParticipantList";
import apiURL from "../constants/apiURL";

export default function RoomManager(props) {
  const { roomName, displayName } = props;
  const socketRef = useRef();
  const participantListRef = useRef();
  const [cursorList, setCursorList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [language, setLanguage] = useState("javascript");
  const [text, setText] = useState(snippets["javascript"]);
  const [drawing, setDrawing] = useState([]);
  const [output, setOutPut] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);

  const [input, setInput] = useState([]);
  const [tt, seTT] = useState("");

  useEffect(() => {
    socketRef.current = io(
      `${apiURL}?roomName=${roomName}&displayName=${displayName}`
    );

    // Handle incoming participant list changes
    socketRef.current.on("list change", (newList) => {
      participantListRef.current = newList;
      console.log("New list state: ", participantListRef.current);
      refreshCursorList();
      refreshNameList();
    });

    // Handle incoming cursor changes
    socketRef.current.on("cursor change", (data) => {
      const targetUser = participantListRef.current[data.clientId];
      targetUser.cursorPos = data.newCursorPos;
      refreshCursorList();
    });

    // Handles incoming text changes
    socketRef.current.on("text change", (newText) => {
      setText(newText);
    });

    // Handles incoming language changes
    socketRef.current.on("language change", (newLang) => {
      setLanguage(newLang);
      setText(text);
      // setText(snippets[newLang]);
    });

    // Handles incoming canvas changes
    socketRef.current.on("canvas change", (newDrawing) => {
      setDrawing(newDrawing);
    });

    // When component is deleting, close the existing connection
    // before exiting
    return function closeSocket() {
      console.log("Disconnecting now");
      socketRef.current.disconnect();
    };
  }, [roomName]);

  function handleLocalTextChange(newText) {
    // Update our changes locally
    setText(newText);

    // Send to everyone else
    socketRef.current.emit("text change", newText);
  }

  function disPlayOutput(answer) {
    setOutPut(answer);
  }

  function handleLocalLanguageChange(newLang) {
    // Update our language locally
    setLanguage(newLang);
    setText(text);
    // Set text to default code of this new lang
    //setText(snippets[newLang]);

    // Emit language change to everyone else
    socketRef.current.emit("language change", newLang);
  }

  function ipChange(ip) {
    setInput(ip);
  }

  function handleLocalDrawingChange(newDrawing) {
    // Update our drawing locally
    setDrawing(newDrawing);
    // Emit canvas change to everyone else
    socketRef.current.emit("canvas change", newDrawing);
  }

  function handleLocalCursorChange(newCursorPos) {
    // Update our cursor locally
    const myObject = participantListRef.current[socketRef.current.id];
    myObject.cursorPos = newCursorPos;

    // Emit cursor change to everyone else
    socketRef.current.emit("cursor change", {
      clientId: socketRef.current.id,
      newCursorPos: newCursorPos,
    });

    refreshCursorList();
  }

  function refreshCursorList() {
    const newCursorList = [];
    for (let key in participantListRef.current) {
      if (key !== socketRef.current.id) {
        newCursorList.push({
          cursorPos: participantListRef.current[key].cursorPos,
          color: participantListRef.current[key].color,
        });
      }
    }

    setCursorList(newCursorList);
  }

  function refreshNameList() {
    const newNameList = [];
    for (let key in participantListRef.current) {
      newNameList.push({
        displayName: participantListRef.current[key].displayName,
        color: participantListRef.current[key].color,
      });
    }

    setNameList(newNameList);
  }

  function getOutput() {
    setIsCompiling(true);

    axios
      .post(apiURL + "/code/run", {
        code: text,
        input: input,
        id: "fsf",
        lang: language,
      })
      .then((responce) => {
        seTT(responce.data);
        setIsCompiling(false);
      })
      .then(() => {});

    // scrolling :
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="app-container">
      <TextEditor
        text={text}
        getOutput={getOutput}
        output={tt}
        ipChange={ipChange}
        isCompiling={isCompiling}
        setText={handleLocalTextChange}
        language={language}
        setLanguage={handleLocalLanguageChange}
        displayName={displayName}
        roomName={roomName}
        setCursor={handleLocalCursorChange}
        cursorList={cursorList}
      />

      {/* <button onClick={getOutput}>compile</button> */}

      <Whiteboard drawing={drawing} setDrawing={handleLocalDrawingChange} />

      <ParticipantList nameList={nameList} />
    </div>
  );
}
