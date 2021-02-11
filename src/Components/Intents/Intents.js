/* 

  Author: Ankit Bhatia
  Description: This component is creating the list of IntentCards and maintaining the state of the select boxes.
  Tests: No Test cases have been written so far.
  API Calls: Its always better to have a separate service file and create a singleton class inside it but since its a dummy application so I have not chosen that path.
            I am fetching the data in useEffect hook using fetch method.
  Improvements: Further I can make the following improvements in this component:
                1. I can introduce Redux here to maintain the state of the selections and store it at one single place.
                2. Instead of calling the fetch method directly I can create a service and channel all the calls through that service.
                3. I can create a separate component for checkbox which can receive the respective props.

*/

import React, { useEffect, useState } from 'react';
import IntentCard from '../IntentCard/IntentCard';
import './Intents.scss';


const Intents = () => {
    const [intentsList, setIntentsList] = useState([]);
    const [selectAllState, setSelectAllState] = useState(false);


    /* Fetching the data from the JSON file and updating the intent list in the state */
    useEffect(async () => {
        fetch('intents.json', {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(resp => {
            /* updating the data by adding selected key and by default keeping it as false */
            let updatedIntents = resp.map(item => {
                item['selected'] = false;
                return item;
            })
            setIntentsList(updatedIntents); // setting the updated intents in the state.
            
        })
    }, [])

    /* 
        This method is the handler for selecting and deselecting the individual intent.
        It is recieving the intent changed and updating the selected key accordingly.
    */
    let setSelectionHandler = e => {
        let updatedIntentSelection = intentsList.map(intent => {
            intent.id === e.target.id ? intent.selected = e.target.checked : intent.selected = intent.selected;
            return intent;
        })
        
        /* 
            UseCase: 
            1. if user selects all of the cards individually one by one it should automatically check the select all checkbox.
            2. if user clicks select all and unchecks at least one of the individual card then it should uncheck the select all checkbox.
        */
        let shouldSelectAllSelected = updatedIntentSelection.every(intent => intent.selected); // using every method to identify if all individual cards are checked or not.

        setSelectAllState(shouldSelectAllSelected); //updating the state of selectall checkbox
        setIntentsList(updatedIntentSelection); // updating the state of Intents
    }

    /* Creating the child IntentCards */
    let intents = intentsList.map(intent => (
        <IntentCard 
            isSelected={intent.selected} 
            intentData={intent} 
            changedSelection={setSelectionHandler.bind(this)} 
            key={intent.id} />
    ))

    /* Select all select and deselect functionality */
    let selectAllHandler = e => {
        let allSelectedIntents = intentsList.map(intent => {
            if(e.target.checked) {
                intent.selected = true
                setSelectAllState(true);
            } else {
                intent.selected = false;
                setSelectAllState(false);
            }
            return intent;
        })
        setIntentsList(allSelectedIntents);
    }

    return (
        <>
        <div className="select-all">
            <input type="checkbox" value="selectall" checked={selectAllState} onChange={selectAllHandler.bind(this)} />
            <span>Select All</span>
        </div>
        <div className="intents">{intents}</div>
        </>
    );
}

export default Intents;