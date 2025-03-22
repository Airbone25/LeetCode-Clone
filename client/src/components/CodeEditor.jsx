import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Play, Loader2 } from 'lucide-react';

function CodeEditor({ runCode, value, onChange, loading }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            
            {/* CodeMirror Editor */}
            <div className="border-b">
                <CodeMirror
                    value={value}
                    height="400px"
                    extensions={[javascript()]}
                    onChange={onChange}
                    theme="light"
                />
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between p-4 bg-gray-50">
                
                {/* Language & Theme Info */}
                <div className="text-sm text-gray-500">
                    <span className="font-medium">Language:</span> JavaScript
                </div>

                {/* Run Button */}
                <button
                    onClick={runCode}
                    className={`flex items-center justify-center px-6 py-3 rounded-md text-white font-medium transition ${
                        loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Running...
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5 mr-2" />
                            Run Code
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default CodeEditor;
