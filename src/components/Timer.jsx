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
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setMs(Date.now() - now);
      }, 1);
    } else if (!isActive && ms !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, now, ms]);

  const mathDel = (num) => Math.trunc(num);

  return (
    <div>
      <Card title="Timer" bordered={false} style={{ width: 300 }}>
        <div className="time">
          {mathDel(ms / 1000 / 60) < 60 ? mathDel(ms / 1000 / 60) : mathDel(ms / 1000 / 60) % 60}
          m: {mathDel(ms / 1000) < 10 ? mathDel(ms / 1000) : mathDel(ms / 1000) % 60}
          s: {ms < 1000 ? ms : ms % 1000}
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
