import logo from "./logo.svg";
import "./main.scss";
import {
  Moisture,
  Cloud,
  ThermometerHalf,
  Sun,
  ArrowClockwise,
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchData } from "./Api";
import React, { Suspense } from "react";
import RingLoader from "react-spinners/RingLoader";

const resource = fetchData();
const server = "192.168.1.130";
var response;
var states = {
  ilumination: "",
  pump: "",
};

function App() {
  const [spiner, SetSpinner] = useState({
    color: "#1A374D",
    height: "150",
    width: "150",
  });

  const DataDetails = () => {
    response = resource.data.read();
    console.log(response);
    if (response.ilumination === "true") {
      states.ilumination = "on";
    } else {
      states.ilumination = "";
    }
    if (response.pump === "true") {
      states.pump = "on";
    } else {
      states.pump = "";
    }
    return (
      <div className="App">
        <div id="title" className="d-flex p-2">
          <h1>Iot Garden</h1>
          <div className="reload" onClick={() => window.location.reload(false)}>
            <ArrowClockwise />
          </div>
        </div>
        <div className="scrollmenu">
          <div style={{ backgroundColor: "#876445" }} className="card-body">
            HUMEDAD DE SUELO
            <div className="d-flex p-2 icon">
              <Moisture />
            </div>
            <div className="d-flex p-2 data">{response.moisture} %</div>
          </div>
          <div style={{ backgroundColor: "#B1D0E0" }} className="card-body">
            HUMEDAD AMBIENTE
            <div className="d-flex p-2 icon">
              <Cloud />
            </div>
            <div className="d-flex p-2 data">{response.humidity} %</div>
          </div>
          <div style={{ backgroundColor: "#FF7F3F" }} className="card-body">
            TEMPERATURA
            <div className="d-flex p-2 icon">
              <ThermometerHalf />
            </div>
            <div className="d-flex p-2 data">{response.temperature} °C</div>
          </div>
          <div style={{ backgroundColor: "#F6D860" }} className="card-body">
            ILUMINACION
            <div className="d-flex p-2 icon">
              <Sun />
            </div>
            <div className="d-flex p-2 data">{response.light} lux</div>
          </div>
        </div>
        <div className="botones">
          <div className="btn-text">BOMBA</div>

          <div className="d-flex p-2 toggle">
            <label className="switch">
              <input
                defaultChecked={states.pump}
                onClick={(e) => updateState(response, e.target.id)}
                id="pump"
                type="checkbox"
              />
              <span className="slider round bomba"></span>
            </label>
          </div>
          <div className="btn-text">ILUMINACION</div>

          <div className="d-flex p-2 toggle">
            <label className="switch">
              <input
                defaultChecked={states.ilumination}
                onClick={(e) => updateState(response, e.target.id)}
                id="ilumination"
                type="checkbox"
              />
              <span className="slider round iluminacion"></span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  async function fetchData() {
    axios
      .get(`http://${server}/api.php?task=select`)
      .then((res) => {
        SetData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function updateState(response, device) {
    console.log("device: " + device);
    var state = response[device];
    console.log(state);
    if (state == "true") {
      state = "'false'";
      states[device] = "";
    } else {
      state = "'true'";
      states[device] = "on";
    }
    axios
      .get(
        `http://${server}/api.php?task=chstate&device=${device}&state=${state}`
      )
      .then((res) => {
        // SetData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <h1
              style={{
                fontFamily: "'Share Tech', sans-serif",
                textAlign: "center",
                fontSize: "50px",
              }}
            >
              Loading...
            </h1>
            <div
              style={{
                height: "192px",
                width: "192px",
                margin: "-96px 0 0 -96px",
                top: "50%",
                left: "50%",
                position: "absolute",
              }}
            >
              <RingLoader color={spiner.color} size={160} />
            </div>
          </div>
        }
      >
        <DataDetails />
      </Suspense>
    </div>
  );
}

export default App;
