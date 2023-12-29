import React from "react";
import InputLabel from "../InputFields/InputLabel";
import TextInput from "../InputFields/TextInput";

const Forms = () => {
  return (
    <>
      <form action="">
        <div className="flex flex-col gap-3 items-center">
          <InputLabel htmlFor="city" label="Enter your city" />
          <TextInput name="city" id="city" />
        </div>
        <button className="btn text-lg font-semibold tracking-wide border border-white/50 mt-5 py-2 rounded-full shadow-lg">
          Search
        </button>
      </form>
    </>
  );
};

export default Forms;
