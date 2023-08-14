import { useState } from "react";

function useJson(){
    const [json, setJson] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [rootClass, setRootClass] = useState<string>("");

    function firstUpper(str:string){
        return str[0].toUpperCase() + str.slice(1)
    }

    function jsonToDart(jsonObject: object, classname: string) {
        const temp = Object.keys(jsonObject);
        const { innerBranch, outputData } = declaration(jsonObject, temp);
        classname = classname?classname:"Root";
        const data = `class ${classname} {
          ${outputData}
      
          ${classname}({${selfBinding(temp)}}); 
      
          ${classname}.fromJson(Map<String, dynamic> json) {
              ${fromJson(jsonObject,temp)}
          }
      
          Map<String, dynamic> toJson() {
              final Map<String, dynamic> data = Map<String, dynamic>();
              ${toJson(jsonObject,temp)}
              return data;
          }
        }`;
        console.log(data);
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
            outputData += `${firstUpper(arr[i])}? ${arr[i]};\n`;
            innerBranch += jsonToDart(jsonObject[arr[i]], firstUpper(arr[i]));
          }
        }
        return { innerBranch, outputData };
      }
    
      function selfBinding(arr: string[]) {
        var outputData = arr.map((key) => `this.${key}`).toString();
        return outputData;
      }
    
      function fromJson(jsonObject:any,arr: string[]) {
        var outputData = ``;
        for (let i = 0; i < arr.length; i++) {
            if(typeof(jsonObject[arr[i]])===typeof({}))
                outputData +=`${arr[i]} = json['${arr[i]}'] != null ? ${firstUpper(arr[i])}?.fromJson(json['${arr[i]}']) : null;\n`
            else
                outputData += `${arr[i]} = json['${arr[i]}'];\n`;
        }
        return outputData;
      }
    
      function toJson(jsonObject:any,arr: string[]) {
        var outputData = ``;
        for (let i = 0; i < arr.length; i++) {
            if(typeof(jsonObject[arr[i]])===typeof({}))
                outputData +=`data['${arr[i]}'] = ${arr[i]}!.toJson();`
            else
                outputData += `data['${arr[i]}'] = ${arr[i]};\n`;
        }
        return outputData;
      }

  return {json,code,rootClass,setJson,setCode,setRootClass,jsonToDart}
}

export default useJson