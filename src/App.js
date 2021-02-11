/* 

  Author: Ankit Bhatia
  Description: App.js has the root component <Intents /> which starts the application.
                The application is further divided into various components which have their respective scss files.
  CSS: Using SASS/SCSS nesting feature and variables in the whole application.
        Improvement in SCSS:
        1. I can create a mixin for bubbles and functions for converting fixed units to relative units. For eg: all px units in font-size, paddings etc can be converted to rem.
        2. I can also use :root selector to store the values of variables.
  Tests: No Test cases have been written so far.
  API Calls: Its always better to have a separate service file and create a singleton class inside it but since its a dummy application so I have not chosen that path.
  StateManagement: Currently I am managing the state in the parent component, however, for the actual implementation it is better to maintain the state of all the selected intents in a store using Redux and use that state for further steps/processes
*/

import './App.scss';
import './Common/sass/global.scss';
import Intents from './Components/Intents/Intents'

function App() {  
  return (
    <div className="App">
      <Intents />
    </div>
  );
}

export default App;


