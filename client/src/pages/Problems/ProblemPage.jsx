import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../../components/CodeEditor';
import { CheckCircle, XCircle, Loader2, Play, ChevronLeft } from 'lucide-react';

export default function ProblemPage() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [value, setValue] = useState('');
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = (value) => {
        setValue(value);
    };

    const token = JSON.parse(localStorage.getItem('token'));

    async function runCode() {
        if (!problem) return;

        setLoading(true);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/code`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: value, id: problem.id }),
        });

        const results = await res.json();
        console.log(results)
        // setResult(results);
        if (results.success) {
            setResult(results.result);
            setMessage(results.message);
            setLoading(false);
        }
        if (!results.success) {
            setResult(results.result);
            setMessage(results.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProblem(id);
    }, [id]);

    async function getProblem(id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/problems/${id}`);
        const data = await res.json();
        setProblem(data);
        setValue(`function outputFunction(${data.inputs.join(', ')}) {\n\t\n}`);
        setResult(null);
    }

    if (!problem) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Problem Section */}
                <div className="w-1/2 overflow-y-auto p-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h1 className="text-4xl font-bold text-gray-900">{problem.title}</h1>
                        <p className="text-gray-600 mt-4">{problem.description}</p>

                        <div className="mt-6">
                            <span className="text-sm font-semibold text-gray-500">Difficulty:</span>
                            <span
                                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                                    problem.difficulty === 'Easy'
                                        ? 'bg-green-100 text-green-600'
                                        : problem.difficulty === 'Medium'
                                        ? 'bg-yellow-100 text-yellow-600'
                                        : 'bg-red-100 text-red-600'
                                }`}
                            >
                                {problem.difficulty}
                            </span>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Inputs:</h3>
                            <div className="bg-gray-100 p-4 rounded-md mt-2">
                                {problem.testCases[0].input.map((input, index) => (
                                    <p key={index} className="text-gray-800 text-sm">{input}</p>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Expected Output:</h3>
                            <div className="bg-gray-100 p-4 rounded-md mt-2 text-gray-800">
                                {problem.testCases[0].output}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code Editor Section */}
                <div className="w-1/2 h-fit bg-white flex flex-col p-8">
                    
                    {/* Editor */}
                    <div className="flex-1 border rounded-lg shadow-lg overflow-hidden">
                        <CodeEditor runCode={runCode} value={value} onChange={onChange} loading={loading}/>
                    </div>

                    {/* Run Button */}
                    {/* <div className="mt-4 flex justify-between items-center">
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
                        </button> */}
                    {/* </div> */}

                    {/* Result */}
                    {result && (
                        <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Test Results</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {result.map((res, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between px-4 py-3 rounded-md ${
                                            res === true
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                        }`}
                                    >
                                        <span className="font-medium">Test Case {index + 1}</span>
                                        {res === true ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <XCircle className="w-5 h-5" />
                                        )}
                                    </div>
                                ))}
                                <div>
                                    Message: {message}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
