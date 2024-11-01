import { useState } from 'react'
import './App.css'
import FormValidation from './component/FormValidation';
import FormApi from './component/FormApi';

function App() {
  

  return (
    <div>
      <h1 className="">
        {/* <FormValidation/> */}
        <FormApi/>
      </h1>
    </div>
  );
}

export default App
