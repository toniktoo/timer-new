import React, { useState, useEffect } from 'react';
import { Button, Card } from 'antd';

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [now, setNow] = useState(null);
  const [ms, setMs] = useState(0);

  function toggle() {
    setIsActive(!isActive);
    if (now === null) {
      setNow(Date.now());
    }
  }

  function reset() {
    setIsActive(false);
    setMs(0);
    setNow(null);
  }

  useEffect(() => {
    let timerId = null;
    if (isActive) {
      timerId = setTimeout(function tick() {
        setMs(Date.now() - now);
        timerId = setTimeout(tick, 24);
      }, 24);
    } else if (!isActive && ms !== 0) {
      clearTimeout(timerId);
    }
    return () => clearTimeout(timerId);
  }, [isActive, now, ms]);

  const mathDel = (num) => Math.trunc(num);

  // eslint-disable-next-line max-len
  const renderHour = () => (mathDel(ms / 1000 / 60) < 60 ? mathDel(ms / 1000 / 60) : mathDel(ms / 1000 / 60) % 60);

  const renderMin = () => (mathDel(ms / 1000) < 10 ? mathDel(ms / 1000) : mathDel(ms / 1000) % 60);

  const renderSec = () => (ms < 1000 ? ms : ms % 1000);

  return (
    <div>
      <Card title="Timer" bordered={false} style={{ width: 300 }}>
        <div className="time">
          {renderHour()}
          m:
          {' '}
          {renderMin()}
          s:
          {' '}
          {renderSec()}
          ms
          <hr />
          <div>
            <Button type="primary" onClick={toggle} style={{ marginRight: 5 }}>
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button type="primary" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Timer;
