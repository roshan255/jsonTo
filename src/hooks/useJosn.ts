import { useState } from "react";

function useJson(){
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

  return {json,code,rootClass,setJson,setCode,setRootClass,jsonToDart}
}

export default useJson