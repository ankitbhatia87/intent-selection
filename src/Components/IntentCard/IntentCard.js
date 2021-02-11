/* 

  Author: Ankit Bhatia
  Description: This component is receiving the props and creating the layout of each Intent Card.
                It is also calling the setSelectionHandler method in the parent component to update the state of the selections.
  Tests: No Test cases have been written so far.
  API Calls: No API call is required here.
  Improvements: Further I can make the following improvements in this component:
                1. I can further breakdown this component in 
                    a. userbubble
                    b. aibubble 
                    c. checkbox component which can be utilized anywhere and can be manipulated as per the props.

*/

import React from 'react';
import './IntentCard.scss';

const IntentCard = props => {

    /* setting the props data in its respective variables. I am using const because these variables should not get manipulated within the component */
    const intent = props.intentData,
    trainingData = intent.trainingData,
    intentId = intent.id,
    expressions = intent.trainingData.expressions.map(exp => (
        <li key={exp.id}>{exp.text}</li> // creating the list of sample expressions.
    ));

    
    
    return (
        <div className="intent">
            <input type="checkbox" className="intent-select" checked={props.isSelected} id={intentId} onChange={props.changedSelection.bind(this)} />
            <div className="left-section">
                <div className="title">
                    <h3>{intent.name}</h3>
                    <p className="description">{intent.description}</p>
                </div>
                <ul className="expressions">
                    {expressions}
                    <li className="total-expressions"> and {trainingData.expressionCount-intent.trainingData.expressions.length} more expressions...</li>
                    {/* Three expressions are already visible so reducing the total count by the length of sample expressions and displaying the number */}
                </ul>
                <p ></p>
            </div>
            <div className="right-section">
                {/* This is the section that shows the example of the expressions and AI Reply */}
                <div className="user-expression">
                    <p>User's <em>expression:</em></p>
                    <div className="bubble user-bubble">{trainingData.expressions[0].text}</div>
                </div>
                <div className="ai-reply">
                    <p>AI <em>replies:</em></p>
                    <div className="bubble ai-bubble">{intent.reply.text}</div>
                </div>
            </div>
        </div>
    )
}

export default IntentCard;