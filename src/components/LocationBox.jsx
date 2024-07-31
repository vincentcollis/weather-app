import React, { useEffect } from "react";
import {useState} from "react"

import '../App.css';

function LocationBox (props){
    const backgroundHandler = props.backgroundHandler
    const locationBoxInput = props.locationBoxInput

    // const [zipCodeState,setZipCodeState] = useState('')

    function inputHandler(e){
        e.preventDefault()
        
        const input = e.target.value
        backgroundHandler(input)
    }

    console.log(props.locationBoxInput)
    
    return(
            <form>
                <label>
                    Location: 
                <input 
                    className="locationBoxInputBox" 
                    value={locationBoxInput}
                    onChange={ e => inputHandler(e)}
                ></input>
                </label>
            </form>
    )
}

export default LocationBox