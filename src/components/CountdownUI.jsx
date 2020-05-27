import React from 'react';
import { Slider, InputNumber } from 'antd';
import PropTypes from 'prop-types';

const CountdownUI = (props) => {
  const {
    isActive,
    minutes,
    handleSecondsChange,
    handleSliderChange,
    handleMinutsChange,
    seconds,
  } = props;
  return (
    <div>
      <div>
        <span>minutes: </span>
        <InputNumber
          disabled={isActive}
          min={0}
          max={719} // у минут ограничиваться 720 минутами
          style={{}}
          value={minutes}
          onChange={handleMinutsChange}
          type="number"
        />
      </div>
      <div>
        <span>seconds: </span>
        <InputNumber
          disabled={isActive}
          min={0}
          max={60} // у секунд 0 до 60 сек
          style={{}}
          value={seconds}
          onChange={handleSecondsChange}
          type="number"
        />
      </div>
      <div>
        <Slider
          disabled={isActive}
          min={0}
          max={60 * 60} // у слайдера 0 до 60 минут
          step={15} // шаг 15с
          onChange={handleSliderChange}
          value={minutes * 60 + seconds}
        />
      </div>
    </div>
  );
};

CountdownUI.propTypes = {
  isActive: PropTypes.bool.isRequired,
  minutes: PropTypes.number.isRequired,
  handleSecondsChange: PropTypes.func.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  handleMinutsChange: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default CountdownUI;
