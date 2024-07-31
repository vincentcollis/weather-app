import React, { useEffect, useState } from "react";
import LocationBox from './components/LocationBox'
import './App.css';
// import "../components.css"

function App (props){
    const [locationInputBoxState ,setlocationInputBoxState]= useState('')
    
    const [appBackgroundState, setappBackgroundState] = useState('')


    function backgroundHandler(locationBoxInput){
        setlocationInputBoxState(locationBoxInput)
    }

    async function getData(URL){
        try{
            const response = await fetch(URL)
            if(!response.ok){
                return console.log('Not valid zipcode')
            }
            const data = await response.json()
            console.log(data)

            if(data.temperature > 80){
                console.log("its hot")
                setappBackgroundState('blue')
            }
        } catch(error) {
            console.log(error)
        }
    }

    // run function depending on state change of LocationBox
    useEffect(()=>{
        const ZIP = locationInputBoxState
        const URL = `http://localhost:3000/api/?zip=${ZIP}`

        // if users input box has 5 charecters, send fetch request
        if(locationInputBoxState.length === 5){
            getData(URL)
        }
    },[locationInputBoxState])

    return(
        <div id="root">
            <LocationBox 
            id={appBackgroundState}
            backgroundHandler={backgroundHandler} 
            locationBoxInput = {locationInputBoxState} />
        </div>
    )
}

export default App