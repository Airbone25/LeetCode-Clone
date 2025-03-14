import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function CodeEditor({runCode, value, onChange}) {
  return (
    <div>
        <CodeMirror
          value={value}
          height="200px"
          extensions={[javascript()]}
          onChange={onChange}
        />
        <button className="px-2 py-4 border-2 rounded-lg" onClick={runCode}>Submit</button>
    </div>
  )
}

export default CodeEditor