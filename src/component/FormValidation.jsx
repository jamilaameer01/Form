import React, { useState } from "react";
import Select from "react-select";

const FormValidation = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [emailChecked, setEmailChecked] = useState(false);
  const [linkedinChecked, setLinkedinChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState("");
    const [number, setNumber] = useState("");
     const [phoneError, setPhoneError] = useState("");

  const options = [
    { value: "op1", label: "Software Engineer" },
    { value: "op2", label: "Product Manager" },
    { value: "op3", label: "UX Designer" },
  ];

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const submitHandle = (e) => {
    e.preventDefault(); 

   
    if (!emailChecked && !linkedinChecked) {
      setErrorMessage("Please select at least one communication preference.");
    } else {
      setErrorMessage(""); 
      console.log("Form submitted:", {
        email: emailChecked,
        linkedin: linkedinChecked,
        job: selectedOption,
          user,
        number,
      });
     
    }
  };

  const userHandler = (e) => {
    setUser(e.target.value);
  };
 const NumberHandler = (e) => {
   const value = e.target.value;
   
   if (!value || /^[0-9]*$/.test(value)) {
     setNumber(value);
     setPhoneError(""); 
   } else {
     setPhoneError("Phone number must be numeric."); 
   }
 };
  return (
    <div className="max-w-lg mx-auto bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-purple-600 mb-8 text-center">
        Form Validation
      </h1>

      <form className="space-y-6" onSubmit={submitHandle}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={userHandler}
            required
            className="w-full mt-2 text-sm p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-md text-sm font-medium text-gray-700">
            Job
          </label>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={options}
            placeholder="Select your profession"
            className="mt-2 text-gray-700 text-sm"
            required
          />
        </div>

        <div className="pt-4">
          <label className="block text-md text-sm font-medium text-gray-700">
            Communication Preferences
          </label>
          <div className="flex items-center text-sm justify-between mt-2">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="email"
                checked={emailChecked}
                onChange={(e) => setEmailChecked(e.target.checked)}
                className="h-4 w-4 text-sm rounded border-gray-300 text-purple-500 focus:ring-purple-500"
              />
              Email
            </label>
            <label className="flex items-center text-sm gap-2 text-gray-700">
              <input
                type="checkbox"
                name="linkedin"
                checked={linkedinChecked}
                onChange={(e) => setLinkedinChecked(e.target.checked)}
                className="h-4 w-4 text-sm rounded border-gray-300 text-purple-500 focus:ring-purple-500"
              />
              LinkedIn
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>

        <div>
          <label className="block text-md text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            onChange={NumberHandler}
            value={number}
            required
            className="w-full text-sm mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
        </div>

        <button
          type="submit"
          className="w-full text-sm py-3 mt-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormValidation;
