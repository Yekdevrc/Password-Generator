import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
    const [length, setLength]= useState(6)
    const [numberAllowed, setNumberAllowed]=useState(false)
    const [characterAllowed, setCharacterAllowed]=useState(false)
    const [password, setPassword]=useState(" ")

    const passwordGenerate = useCallback(()=>{
        let pass=""
        var str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (numberAllowed) str += "0123456789"
        if (characterAllowed) str += "!@#$%^&*()_+{}~`"

        for (let i=1; i<=length; i++){
            let char= Math.floor(Math.random() * str.length +1)

            pass += str.charAt(char)
        }
        setPassword(pass)

    }, [length, numberAllowed, characterAllowed, setPassword])

    const passwordRef= useRef(null)

    const [copy, setCopy]= useState("Copy")

    const copyToPasswordClipBoard= useCallback(()=>{
        passwordRef.current ?.select()
        window.navigator.clipboard.writeText(password)
        setCopy("Copied!!")
    }, [password])

    useEffect(()=>{
        passwordGenerate()
    }, [length, numberAllowed, characterAllowed, passwordGenerate])

  return (
    <>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-800 bg-gray-500">
            <h1 className="text-4xl text-center text-white mb-3 my-3">Password Generator</h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input type="text"
                       value={password}
                       className="outline-none w-full py-1 px-3"
                       placeholder="Password"
                       ref={passwordRef}
                       readOnly
                />
                <button
                onClick={copyToPasswordClipBoard}
                className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" id='copy'>{copy}</button>
            </div>
            <div className="flex text-sm gap-x-2">
                <div className="flex item-center gap-x-1">
                    <input type="range"
                           min={6}
                           max={50}
                           value={length}
                           className="cursor-pointer"
                           onChange={(e)=>{setLength(e.target.value)}}
                    />
                    <label className='text-white'>Length: {length}</label>
                </div>
                <div className="flex item-center gap-x-1">
                    <input type="checkbox"
                    defaultChecked={numberAllowed}
                    id='numberInput'
                    onChange={(prev)=>{setNumberAllowed((prev) => !prev);}}
                     />
                     <label htmlFor="numberAllowed" className="text-white">Number</label>
                </div>
                <div className="flex item-center gap-x-1">
                    <input type="checkbox"
                    defaultChecked={characterAllowed}
                    id='characterInput'
                    onChange={()=>{
                        setCharacterAllowed((prev) => !prev);
                    }}
                     />
                     <label htmlFor="characterAllowed" className="text-white">Character</label>
                </div>
            </div>
        </div>
    </>
  )
}

export default App
