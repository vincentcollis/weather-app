import React, { useEffect } from "react";
import { useState } from "react";
import "../index.css";
import "../App.css";

function LocationBox(props) {
  const backgroundHandler = props.backgroundHandler;
  const locationBoxInput = props.locationBoxInput;

  function inputHandler(e) {
    e.preventDefault();
    const input = e.target.value;
    backgroundHandler(input);
  }

  return (
    <form>
      <label>
        <div>
          <input
            placeholder="ZIPCODE"
            className="locationBoxInputBox "
            value={locationBoxInput}
            onChange={(e) => inputHandler(e)}
          />
        </div>
      </label>
    </form>
  );
}

export default LocationBox;