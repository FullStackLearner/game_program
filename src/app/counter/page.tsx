'use client';
import Head from './head';

import { useEffect, useState, useRef } from 'react';

import '../style/style.css';

let interValid: string | number | NodeJS.Timer | undefined;

export default function Counter() {
  const [count, setCount] = useState("00:00:00");
  const startTime = useRef(0);
  const elapsedTime = useRef(0);
  const paused = useRef(true);
  const hrs = useRef(0);
  const mins = useRef(0);
  const secs = useRef(0);

  function startBtn() {
    if (paused.current) {
      paused.current = false;
      startTime.current = Date.now() - elapsedTime.current;
      interValid = setInterval(updateTime, 75);
    }
  }

  function pauseBtn() {
    if (!paused.current) {
      paused.current = true;
      elapsedTime.current = Date.now() - startTime.current;

      clearInterval(interValid);
    }
  }

  function resetBtn() {
    paused.current = true;
    clearInterval(interValid);
    startTime.current = 0;
    elapsedTime.current = 0;
    secs.current = 0;
    mins.current = 0;
    hrs.current = 0;
    setCount("00:00:00");
  }

  function updateTime() {
    elapsedTime.current = Date.now() - startTime.current;
    secs.current = Math.floor((elapsedTime.current / 1000) % 60);
    mins.current = Math.floor((elapsedTime.current / (1000 * 60)) % 60);
    hrs.current = Math.floor((elapsedTime.current / (1000 * 60 * 60)) % 60);
    setCount(`${pad(hrs.current)}:${pad(mins.current)}:${pad(secs.current)}`)
  }

  function pad(unit: number) {
    return (("0") + unit).length > 2 ? unit : "0" + unit
  }

  return (
    <html>
      <Head />
      <body>
        <div id="timeContainer">
          <div id="timeDisplay">{count}</div>
          <button id="startBtn" className="timerBtn" onClick={() => {
            startBtn()
          }}>Start</button>
          <button id="pauseBtn" className="timerBtn" onClick={() => {
            pauseBtn()
          }}>Pause</button>
          <button id="resetBtn" className="timerBtn" onClick={() => {
            resetBtn()
          }}>Reset</button>
        </div>
      </body>
    </html>
  )
}
