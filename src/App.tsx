import CodeEditor from "./components/CodeEditor";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-dart";
import useJosn from "./hooks/useJosn";

function App() {
  const { json, code, rootClass, setJson, setCode, setRootClass, jsonToDart } =
    useJosn();

  return (
    <>
      <div>
        <h1>Json to Dart</h1>
        <CodeEditor
          theme="chrome"
          mode="json"
          onChange={(newCode) => setJson(newCode)}
          value={json}
          className="lefteditor"
        />
        <CodeEditor
          theme="monokai"
          mode="dart"
          onChange={(newCode) => setCode(newCode)}
          value={code}
          className="lefteditor"
        />
      </div>
      <input
        placeholder="Enter the root class name"
        value={rootClass}
        onChange={(event) => setRootClass(event.target.value)}
      ></input>
      <br />
      <button
        onClick={() => {
          const data = jsonToDart(JSON.parse(json), rootClass);
          setCode(data);
        }}
      >
        Convert
      </button>
    </>
  );
}

export default App;
