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
      <div className="margin">
        <h1>Json to Dart</h1>
        <CodeEditor
          theme="githutheme-chrome"
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
      <br />
      <input
        className="margin"
        placeholder="Enter the root class name"
        value={rootClass}
        onChange={(event) => setRootClass(event.target.value)}
      ></input>
      <button
        className="btn btn-primary"
        onClick={() => {
          try {
            const regex = /\,(?!\s*?[\{\[\"\'\w])/g;
            const jsonString = json.replace(regex, "");
            const obj = JSON.parse(jsonString);
            const data = jsonToDart(obj, rootClass);
            setCode(data);
          } catch {
            alert("check your Json syntax");
          }
        }}
      >
        Convert
      </button>
    </>
  );
}

export default App;
