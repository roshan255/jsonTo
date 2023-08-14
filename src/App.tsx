import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-dart";

function App() {
  const [json, setJson] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [rootClass, setRootClass] = useState<string>("root");

  function jsonToDart(jsonObject: object, classname: string) {
    const temp = Object.keys(jsonObject);
    const { innerBranch, outputData } = declaration(jsonObject, temp);
    const data = `class ${classname} {
      ${outputData}
  
      ${classname}({${selfBinding(temp)}}); 
  
      ${classname}.fromJson(Map<String, dynamic> json) {
          ${fromJson(temp)}
      }
  
      Map<String, dynamic> toJson() {
          final Map<String, dynamic> data = Map<String, dynamic>();
          ${toJson(temp)}
          return data;
      }
    }`;
    return innerBranch + `\n\n` + data;
  }

  function declaration(jsonObject: any, arr: string[]) {
    var outputData = ``;
    var innerBranch = ``;
    for (let i = 0; i < arr.length; i++) {
      if (typeof jsonObject[arr[i]] === typeof "string")
        outputData += `String? ${arr[i]};\n`;
      else if (typeof jsonObject[arr[i]] === typeof true)
        outputData += `bool? ${arr[i]};\n`;
      else if (typeof jsonObject[arr[i]] === typeof 1)
        outputData += `int? ${arr[i]};\n`;
      else if (typeof jsonObject[arr[i]] === typeof { id: 1 }) {
        outputData += `Items? ${arr[i]};\n`;
        innerBranch = jsonToDart(jsonObject[arr[i]], arr[i]);
      }
    }
    return { innerBranch, outputData };
  }

  function selfBinding(arr: string[]) {
    var outputData = arr.map((key) => `this.${key}`).toString();
    return outputData;
  }

  function fromJson(arr: string[]) {
    var outputData = ``;
    for (let i = 0; i < arr.length; i++) {
      outputData += `${arr[i]} = json['${arr[i]}'];\n`;
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
