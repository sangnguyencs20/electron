import React, { useEffect } from "react";
import { Input, useInput, Grid } from "@nextui-org/react";
import { Textarea } from "@material-tailwind/react";

export default function DescTextarea({ setValue }) {
  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput("Controlled Textarea");

  const validateEmail = (value) => {
    return value !== "";
  };
  useEffect(() => {
    setValue(controlledValue);
  }, [controlledValue]);

  return <Textarea {...bindings} />;
}
