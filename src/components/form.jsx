import React from "react";
import {useState} from "react"

function Form (){

    const [zipCodeState,setZipCodeState] = useState('')

    const inputHandler = (e) =>{
        e.preventDefault()
        const newInput = e.target.value
        setZipCodeState(newInput)
    }

    return(
        <div>
            <form>
                <label>
                    Location: 
                <input 
                    className="inputbox" 
                    value={zipCodeState}
                    onChange={e => inputHandler(e)}
                ></input>
                </label>
            </form>
        </div>
    )

}

export default Form