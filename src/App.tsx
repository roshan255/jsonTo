import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-dart";

function App() {
  const [json, setJson] = useState<string>("");
  const [code, setCode] = useState<string>("");

  function jsonToDart(jsonObject: object) {
    const temp = Object.keys(jsonObject);
    const data = `class Root {
      ${""}
  
      Root({${selfBinding(temp)}}); 
  
      Root.fromJson(Map<String, dynamic> json) {
          ${fromJson(temp)}
      }
  
      Map<String, dynamic> toJson() {
          final Map<String, dynamic> data = Map<String, dynamic>();
          ${toJson(temp)}
          return data;
      }
    }`;
    setCode(data.toString());
  }

  function selfBinding(arr: string[]) {
    var outputData = arr.map((key) => `this.${key}`).toString();
    return outputData;
  }

  function fromJson(arr: string[]) {
    var outputData = ``;
    for (let i = 0; i < arr.length; i++) {
      outputData += `${arr[i]} = json[${arr[i]}];\n`;
    }
    return outputData;
  }

  function toJson(arr: string[]) {
    var outputData = ``;
    for (let i = 0; i < arr.length; i++) {
      outputData += `data['${arr[i]}'] = ${arr[i]};\n`;
    }
    return outputData;
  }

  return (
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
      <button
        onClick={() => {
          jsonToDart(JSON.parse(json));
        }}
      >
        Convert
      </button>
    </div>
  );
}

export default App;
