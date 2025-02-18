import React, { useEffect } from 'react';
import './global.css';
import AppNavigation from './src/navigation';
import { apiCall } from './src/api/openAI';

const App = () => {
  useEffect(()=>{
    apiCall("Where is Mehran University Located?")
  })
  return <AppNavigation />;
};
export default App;