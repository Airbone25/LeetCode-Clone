import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function CodeEditor({runCode, value, onChange}) {
  return (
    <div>
        <button className="p-1 border-2 rounded-lg mb-5" onClick={runCode}>Submit</button>
        <CodeMirror
          value={value}
          height="200px"
          extensions={[javascript()]}
          onChange={onChange}
        />
        
    </div>
  )
}

export default CodeEditor