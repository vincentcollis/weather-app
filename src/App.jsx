import React, { useEffect, useState } from "react";
import LocationBox from './components/LocationBox';

function App(props) {
    const [locationInputBoxState, setlocationInputBoxState] = useState('');
    const [appBackgroundState, setappBackgroundState] = useState('normal');

    const weatherDivsArray = []
    const weatherContainerController = {
        normal:{
            containerName: "mainContainer",
        },
        sunny:{
            containerName: "mainContainerSunny",
            className: "ray"
        },
        rain:{
            containerName: "mainContainerRainy",
            className: "raindrop"
        },
        snow:{
            containerName: "mainContainerSnowy",
            className: "snowflake"
        }
    }

    if (appBackgroundState !== 'normal') {
        let i = 0;
        while (i < 20) {
            weatherDivsArray.push(
                <div className={weatherContainerController[appBackgroundState].className}
                    key={weatherContainerController[appBackgroundState].className + i}
                    style={{ left: `${Math.random() * 100}%`, animationDuration: `${1 + Math.random()}s` }}
                />
            );
            i++;
        }
    }

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
            console.log(data.shortForecast.toUpperCase());

            if (data.shortForecast.includes("Sunny")) {
                setappBackgroundState('sunny');
            } else if (data.shortForecast.includes("Showers")) {
                setappBackgroundState('rain');
            } else if (data.shortForecast.includes("Snow")) {
                setappBackgroundState('snow');
            } else {
                setappBackgroundState('normal');
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
        <div id={weatherContainerController[appBackgroundState].containerName}>
            {weatherDivsArray}
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