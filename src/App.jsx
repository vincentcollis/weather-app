import React, { useEffect, useState } from "react";
import LocationBox from './components/LocationBox';

function App(props) {
    const [locationInputBoxState, setlocationInputBoxState] = useState('');
    const [appBackgroundState, setappBackgroundState] = useState('');

    function backgroundHandler(locationBoxInput) {
        setlocationInputBoxState(locationBoxInput);
    }

    async function getData(URL) {
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                return console.log('Not valid zipcode');
            }
            const data = await response.json();
            console.log(data);

            if (data.temperature > 80) {
                console.log("its hot");
                setappBackgroundState('blue');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const ZIP = locationInputBoxState;
        const URL = `http://localhost:3000/api/?zip=${ZIP}`;

        if (locationInputBoxState.length === 5) {
            getData(URL);
        }
    }, [locationInputBoxState]);

    return (
        <div id="mainContainer">
            <img id="logo" src="./public/weather.svg" style={{ width: "200px" }} alt="Weather Logo" />
            <span id="inputBoxHeader">Easy Weather</span>
            <LocationBox
                id={appBackgroundState}
                backgroundHandler={backgroundHandler}
                locationBoxInput={locationInputBoxState}
            />
        </div>
    );
}

export default App;