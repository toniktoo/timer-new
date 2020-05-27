/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import { Card, Progress, Button } from 'antd';
import CountdownUI from './CountdownUI';
import mp3 from './chimes.wav';

const Countdown = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [progress, setProgress] = useState(100);
  const stylesCard = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const toggle = () => {
    if (!(minutes === 0 && seconds === 0)) {
      setIsActive(!isActive);
    }
    setStartTime(minutes * 60 + seconds);
  };

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setProgress(100);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      setProgress((100 * (minutes * 60 + seconds)) / startTime);
      interval = setInterval(() => {
        if (seconds === 0) {
          setMinutes((min) => min - 1);
          setSeconds(60);
        }
        setSeconds((sec) => sec - 1);
        if (seconds === 1) {
          setMinutes((min) => min - 1);
          setSeconds(59);
        }
        if (minutes === 0 && seconds === 1) {
          new Audio(mp3).play();
          reset();
        }
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, progress, startTime]);

  const handleSecondsChange = (sec) => {
    setSeconds(sec);
  };
  const handleMinutsChange = (min) => {
    setMinutes(min);
    if (min > 718) {
      setSeconds(60);
    } else {
      setSeconds(0);
    }
  };
  const handleSliderChange = (time) => {
    setMinutes(Math.trunc(time / 60));
    setSeconds(time % 60);
  };

  const renderCard = () => (
    <Card
      title="Countdown"
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <div className="time">
        <div style={stylesCard}>
          <div>
            {minutes || 0}
            :
            {seconds || 0}
          </div>
          <Progress type="circle" percent={100 - Math.floor(progress)} width={50} />
          <div>
            <Button
              onClick={toggle}
              type="primary"
              style={{
                marginRight: 4,
              }}
            >
              {!isActive ? 'Start' : 'Stop'}
            </Button>
            <Button onClick={reset} type="primary">
              Reset
            </Button>
          </div>
        </div>
        <hr />
        <CountdownUI
          isActive={isActive}
          minutes={minutes}
          handleMinutsChange={handleMinutsChange}
          seconds={seconds}
          handleSecondsChange={handleSecondsChange}
          handleSliderChange={handleSliderChange}
        />
      </div>
    </Card>
  );
  return <div>{renderCard()}</div>;
};

export default Countdown;
