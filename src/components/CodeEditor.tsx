import AceEditor from "react-ace";

interface Props {
  value: string;
  className: string;
  mode: string;
  theme: string;
  onChange: (newCode: string) => void;
}

function CodeEditor({ value, className, mode, theme, onChange }: Props) {
  return (
    <AceEditor
      onChange={onChange}
      className={className}
      value={value}
      mode={mode}
      theme={theme}
      width="650px"
      height="450px"
    />
  );
}

export default CodeEditor;
