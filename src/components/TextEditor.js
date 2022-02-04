import React, { useRef, useEffect, useState } from "react";
import "codemirror/mode/php/php";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/dracula.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Controlled as CodeMirror } from "react-codemirror2";
import { supportedLanguages, getLanguageMode } from "../constants/editor";
import apiURL from "../constants/apiURL";
import { Button, Spinner } from "react-bootstrap";
import "../css/Io.css";

export default function TextEditor(props) {
  const {
    text,
    setText,
    getOutput,
    language,
    output,
    ipChange,
    isCompiling,
    setLanguage,
    displayName,
    roomName,
    setCursor,
    cursorList, // [{cursorPos, color}]
  } = props;

  const [markerList, setMarkerList] = useState([]);
  const [Output, setOutput] = useState("");
  const cmRef = useRef();

  function compile() {
    getOutput();

    console.log(Output);

    setOutput(output);
  }

  useEffect(() => {
    // Clear any bookmarks that are already set
    while (markerList.length > 0) {
      const marker = markerList.pop();
      marker.clear();
    }

    // Iterate through new list and create bookmarks
    for (let i = 0; i < cursorList.length; i++) {
      const newMarker = createBookmark(
        cursorList[i].cursorPos,
        cursorList[i].color
      );
      markerList.push(newMarker);
    }
  }, [cursorList]);

  function handleTextEditorChange(editor, data, value) {
    setText(value);
  }

  function handleLanguageChange(newLang) {
    setLanguage(newLang);
  }

  function generateLink() {
    alert(`Invitation link copied to clipboard`);
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  function handleCursorChange(editor, data) {
    setCursor(data);
  }

  function createBookmark(cursorPos, color) {
    const cursorCoords = cmRef.current.cursorCoords(cursorPos);
    const cursorElement = document.createElement("span");
    cursorElement.style.borderLeftStyle = "solid";
    cursorElement.style.borderLeftWidth = "2px";
    cursorElement.style.borderLeftColor = color;
    cursorElement.style.height = `${cursorCoords.bottom - cursorCoords.top}px`;
    cursorElement.style.padding = 0;
    cursorElement.style.zIndex = 0;

    const newMarker = cmRef.current.setBookmark(cursorPos, {
      widget: cursorElement,
    });

    return newMarker;
  }

  return (
    <div className="editor-container">
      <div className="editor-top">
        Room : {roomName}
        <Button onClick={generateLink}> Invite </Button>
        {isCompiling && (
          <Button variant="primary" disabled onClick={compile}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden"> Compiling...</span>
          </Button>
        )}
        {!isCompiling && (
          <Button variant="primary" onClick={compile}>
            Compile
          </Button>
        )}
        {/* Display Name: {displayName} */}
        <DropdownButton title={language}>
          {supportedLanguages.map((lang) => (
            <Dropdown.Item
              key={`dropdown-item-${lang}`}
              onSelect={handleLanguageChange}
              eventKey={lang}
            >
              {lang}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      <CodeMirror
        className="code-mirror-wrapper"
        value={text}
        onBeforeChange={handleTextEditorChange}
        onCursor={handleCursorChange}
        editorDidMount={(editor) => (cmRef.current = editor)}
        options={{
          lineWrapping: true,
          lineNumbers: true,
          lint: true,
          mode: getLanguageMode(language),
          theme: "dracula",
          // theme: "material",
        }}
      />
      {/* Input , output */}
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1" className="labels">
          Input
        </label>
        <textarea
          onChange={(e) => {
            ipChange(e.target.value);
          }}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="5"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1" className="labels">
          Output
        </label>
        <textarea
          value={output}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="5"
        ></textarea>
      </div>
    </div>
  );
}
