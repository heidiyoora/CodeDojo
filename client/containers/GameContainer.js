import React, { useContext, createContext, useEffect, useReducer, Provider } from 'react';
import CodeBox from '../components/codeBox';
//import PromptCodeBox from '../components/PromptCodeBox';
import SubmitButton from '../components/Button';
import StartButton from '../components/Button'
//import TotalRowsButton from '../components/Button';
import { AppContext } from '../state/context';
import { io } from 'socket.io-client';
const socket = io()
const GameContainer = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const getAlgoPayload = {
    completedAlgos: appState.completedAlgos,
    totalRows: appState.totalRows,
    roomNumber: appState.roomNumber,
  };

  return (
    <div className='panel'>
      <StartButton 
                genericClick={() => {
                    socket.emit('getAlgo', getAlgoPayload);
                }}
                siteName = {"Start"} id="StartBtnWaitingRoom"/>
      <div className='prompContainer'>
        <h1>{appState.algoName}</h1>
        <p>{appState.prompt}</p>
      </div>
      <CodeBox codeBoxName={'Function'} codeBoxValue={appState.function}/>
      <CodeBox codeBoxName={'Submission Result'} codeBoxValue={appState.submissionTestStatus}/> 
      {/* <p>{appState.totalRows}</p> */}
      <SubmitButton
        genericClick = { () => {
            // fetch(`/game/submit`, {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'Application/JSON',
            //     }
            //     , body: JSON.stringify({
            //         //test_cases: ,
            //         totalRows: 0,
            //     }),
            //   })
            //     .then((data) => data.json())
            //     .then((data) => {
            //         console.log("from backend", data)
            //        // 
            //     }) 
        }}
        siteName={'Submit'}
        id='SubmitBtnGameContainer'
        // genericClick={'submit'}
      />
    </div>
  );
};
export default GameContainer;
            // eval("(var fn = function(s){ return s })");
            // console.log(fn("s"));
            //grab the user input from codeMirror, add paratheses in the begining and end of the string
            //declare a variable (evalfn) to store the = eval(new userInput string)
            //send it back to back end in request body {userFxn = evalfn}
            //     let userFn = eval(
            //     `(function addTwo(num){
            //         return num + 2;
            //     })`)
            // console.log(userFn(2))
/*
    genericClick = { () => {
        fetch(`/game/start`, {
            method: 'POST',
            headers: {
              'Content-Type': 'Application/JSON',
            }
            , body: JSON.stringify({
                completedAlgos: {},
                totalRows: 0,
            }),
          })
            .then((data) => data.json())
            .then((data) => {
                console.log("from backend", data)
                appDispatch({
                    type: 'UPDATE_PROMPT',
                    payload: data.algoPrompt
                })
                appDispatch({
                    type: 'UPDATE_FUNCTION',
                    payload: data.algoStart 
                })  
                appDispatch({
                        type: 'UPDATE_SUBMISSIONTESTSTATUS',
                        payload: data.endGame
                    })
                appDispatch({
                    type: 'UPDATE_TOTALROWS',
                    payload: { totalRows: data.totalRows, }
                })
            }) 
    }}
*/