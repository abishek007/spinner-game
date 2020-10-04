import React, { useState } from "react";
import GoogleSpreadSheet from "google-spreadsheet";
import keys from "./spinner-game-6adb400a495d.json";
import promisify from "util.promisify";
import ArrowLoader from "./ArrorLoader";
import WheelPortion from "./WheelPortion";

// Images
import luckTxt from "./images/luck-txt.svg";
import savingTxt from "./images/2x-saving.svg";
import spinButton from "./images/spin-button.svg";
import triangleMark from "./images/triangle-mark.svg";
import hundredCashback from "./images/100_cashback.svg";
import twentyCashback from "./images/20_cashback.svg";
import fiftyCashback from "./images/50_cashback.svg";
import oneHalfSaving from "./images/1-5savings.svg";
import leftArrow from "./images/left_arrow.svg";

// Styles
import "./App.css";

// Constants
const SPREAD_SHEET_KEY = "1AlswlDtP6DQDDuVwAfgKdG0fxfIVSOpCKi_ZzmOP3_U";
const MOBILE_PWA = "mobile-pwa";
const MAX_VALUE = 999999;
const INFO_TEXT = "Spin the wheel now to get rewarded";
const INFO_SUB_TEXT ="Tap on Spin or rotate the wheel anti-clockwise and release to start spinning";
const QUERY_TEXT = "Have a question?";
const REWARD_TEXT = "Your rewards";
const TIME_INTERVAL = 113;
const SUCCESS_MSG = "Score Added Successfully"

function App() {
  const [load, setLoad] = useState(0);
  const [drag, setDrag] = useState(false);
  const [startPosition, setStartPosition] = useState();

  // UPDATE THE SCORE IN THE GOOGLE SPREADSHEET
  const accessSpreadSheet = async (result) => {
    const doc = new GoogleSpreadSheet(SPREAD_SHEET_KEY, null, { gzip: false });
    await promisify(doc.useServiceAccountAuth)(keys);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const row = {
      web_client: MOBILE_PWA,
      timestamp: new Date().toISOString(),
      spin_result_index: result,
    };
    await promisify(sheet.addRow)(row)
    alert(SUCCESS_MSG)
  };

  // SPINNER CALCULATION
  const startSpin = () => {
    const x = 1024; //min value
    const y = 9999; // max value
    let totalLoad = 110;
    const deg = Math.floor(Math.random() * (x - y)) + y;

    document.getElementById("box").style.transform = "rotate(" + deg + "deg)";
    let timeInterval = setInterval(
      () => setLoad((totalLoad -= 2.5)),
      TIME_INTERVAL
    );
    let element = document.getElementById("mainbox");
    element.classList.remove("animate");
    let point;
    setTimeout(function () {
      element.classList.add("animate");

      const boxOne = document.querySelector(".box1");
      const boxTwo = document.querySelector(".box2");
      let minTopValue = MAX_VALUE;

      for (let index = 0; index < boxOne.childNodes.length; index += 1) {
        let { top } = boxOne.childNodes[
          index
        ].childNodes[0].getBoundingClientRect();
        if (top.toFixed() < minTopValue) {
          minTopValue = top.toFixed();
          point = boxOne.childNodes[
            index
          ].childNodes[0].childNodes[0].getAttribute("data-points");
        }
      }

      for (let index = 0; index < boxTwo.childNodes.length; index += 1) {
        let { top } = boxTwo.childNodes[
          index
        ].childNodes[0].getBoundingClientRect();
        if (top.toFixed() < minTopValue) {
          minTopValue = top.toFixed();
          point = boxTwo.childNodes[
            index
          ].childNodes[0].childNodes[0].getAttribute("data-points");
        }
      }

      clearInterval(timeInterval);
      accessSpreadSheet(point)
    }, 5000);
  };

  const spinMouseDown = (e) => {
    e.preventDefault();
    setDrag(true)
    // mouse pos
    const Mx = e.clientX, My = e.clientY
    setStartPosition(Mx)
  }

  const spinMouseUp = (e) => {
    e.preventDefault();
    setDrag(false)
    // mouse pos
    const Mx = e.clientX, My = e.clientY
    if ((startPosition - Mx) > 120) {
      startSpin()
    }
  }

  const spinMouseMove = (e) => {
    e.preventDefault();
    // mouse pos
    if (drag) {
      const Mx = e.clientX, My = e.clientY
      document.getElementById("box").style.transform = "rotate(" + (-Mx + 50) + "deg)";
    }
  }

  return (
    <>
      <div className="rewards-sec">
        <img src={leftArrow} alt="left-arrow" className="left-arrow" />
        <p>{REWARD_TEXT}</p>
      </div>
      <div id="mainbox" className="mainbox">
        <img src={triangleMark} alt="triangle-mark" className="triangle-mark" />
        <div id="box" className="box" onMouseDown={spinMouseDown} onMouseUp={spinMouseUp} onMouseMove={spinMouseMove}>
          <div className="box1">
            <WheelPortion
              className="span1"
              src={luckTxt}
              alt="luck-txt"
              imgClassName="luck-txt"
              pointsVal={0}
            />
            <WheelPortion
              className="span2"
              src={fiftyCashback}
              alt="fifty-cashback"
              imgClassName="fifty-cashback"
              pointsVal={50}
            />
            <WheelPortion
              className="span3"
              src={savingTxt}
              alt="saving-txt"
              imgClassName="saving-txt"
              pointsVal={"2X"}
            />
            <WheelPortion
              className="span4"
              src={hundredCashback}
              alt="hundred-cashback"
              imgClassName="hundred-cashback"
              pointsVal={100}
            />
          </div>
          <div className="box2">
            <WheelPortion
              className="span1"
              src={oneHalfSaving}
              alt="one-half-saving"
              imgClassName="one-half-saving"
              pointsVal={"1.5X"}
            />
            <WheelPortion
              className="span2"
              src={savingTxt}
              alt="saving-txt"
              imgClassName="saving-txt"
              pointsVal={"2X"}
            />
            <WheelPortion
              className="span3"
              src={twentyCashback}
              alt="twenty-cashback"
              imgClassName="twenty-cashback"
              pointsVal={20}
            />
            <WheelPortion
              className="span4"
              src={fiftyCashback}
              alt="fifty-cashback"
              imgClassName="fifty-cashback"
              pointsVal={50}
            />
          </div>
        </div>
        <img
          src={spinButton}
          alt="spin-button"
          className="spin-button"
          onClick={startSpin}
        />
        <ArrowLoader loadVal={load} />
      </div>
      <div className="info-sec">
        <div className="info-txt">{INFO_TEXT}</div>
        <div className="info-subtxt">{INFO_SUB_TEXT}</div>
      </div>
      <div className="query-sec">
        {QUERY_TEXT} <div className="query-txt">Get help</div>
      </div>
    </>
  );
}

export default App;
