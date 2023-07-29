import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const CustomDatepicker = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Datepicker
      value={value}
      onChange={handleValueChange}
      showShortcuts={true}
    />
  );
};
export default CustomDatepicker;
