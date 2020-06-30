
# RX-Global


Manage and interact with state from everywhere in your application.

This state management library is based on React.useState hook.

Minimal Setup and intuitive developer experience, esspecially with TypeScript.

## Reference



`npm i --save rx-global`
```javascript
// All exportet methods:
import {
	setGlobalState,
	useGlobalState,
	getGlobalState,
	updateGlobalState,
	subGlobalState,
	unsubGlobalState,
	resetGlobalState,
	resetGlobalStates
} from  'rx-global';
```
#
##### Best practive: keep id for state consistent.
```javascript
// When named export, TypeScript will detects your state variables.
// This will improve developer experience.

export const COUNTER = "COUNTER";

// COUNTER will be used in snippets below!
```
#
##### setGlobalState(id: string, value: any):
```javascript
// This will initialize the state for "COUNTER" to 0, if not existing.
// Otherwise it will set it to 0.
setGlobalState(COUNTER, 0);
```
Use cases:

 - Set initial value for a certain state (if not initialized, subGlobalState and updateGlobalState wont work)
 - Set a certain state from inside or outside of a React component, without knowing the previous state.

#

##### useGlobalState(id: string, initialValue?: any):
```javascript
// React Hooks rules apply!
// InitialValue will initialize COUNTER to 0 if it hasnt
// been initialized otherwise. InitialValue is optional!
const [state, setState] = useGlobalState(COUNTER, 0);

// Same as useState but global
// const [state, setState] = useState(0);
```
Use Cases:

 - Use inside a React functional component to set and react to a certain state
 - Use useState untill a state needs to be shared globally and switch to useGlobalState.

#
##### getGlobalState(id: string):
```javascript
// Get a certain global state
const counter = getGlobalState(COUNTER);
```
Use Cases:

 - Read state from anywhere without interacting with it.
 - Check for state in scripts outside of your components.

#
##### updateGlobalState(id: string, cb: Function => any):
```javascript
// Update a certain state from anywhere.
// The callback will always give you access to the previous state
updateGlobalState(COUNTER, (state) => {
	if (state <= 0) {
		return 0;
	}
	return state - 1;
});
```
Use Cases:

 - Can be used anywhere you use setGlobalState
 - Update a certain state when you need to know the previous state
 - Example above: Prevent a counter from dropping below 0.

#
##### subGlobalState(id: string, cb: Function => void):
```javascript
// Update a certain state from anywhere.
// The callback will always give you access to the previous state
const userFeedBack = (state) => {
	if (state === 10) {
		congratulateUser("You have reached 10 points");
	}
};
subGlobalState(COUNTER, userFeedBack);
```
Use Cases:

 - Use this method to have certain events be triggered based on a certain state change
 - Any kind of state validation
 - User feedback on certain state changes

**! Since subGlobalState is not called from the scope of a React functional component, it is not using React.useState and cant unsubscribe based on component life-cycle. In order to safely use subGlobalState, use unsubGlobalState to clean up subscriptions when needed, to prevent a memory leak!**

#
##### unsubGlobalState(id: string, cb: Function => void):
```javascript
// This removes a subscribed callback function from a certain state.
unsubGlobalState(COUNTER, userFeedBack);
```
Use Cases:

 - As described in subGlobalState: clean up subscriptions when needed
 - Use together with subGlobalState to dynamically have states and components interact with each other. You can use other rx-global methods inside the subscription to have full control over your application state.

#
##### resetGlobalState(id: string):
```javascript
// This resets a certain state back to its initial value.
resetGlobalState(COUNTER);
```
Use Cases:

 - Whenever you like to have the initial value again :)

#
##### resetGlobalStates(ids: string[]):
```javascript
// In case you want to reset multiple states to its initial value.
resetGlobalState([COUNTER]);
```
Use Cases:

 - Whenever resetGlobalState is to slow.


## Example
This is not an best practive example on how to use this library. Its a simplyfied display of what is possible!
Please request more documentation for best practices and use cases!
```javascript
import React from "react";
import {
	setGlobalState,
	useGlobalState,
	getGlobalState,
	updateGlobalState,
	subGlobalState,
	unsubGlobalState,
	resetGlobalState,
	resetGlobalStates
} from  'rx-global';

const COUNTER = "COUNTER";
const USER_WON = "USER_WON";

setGlobalState(COUNTER, 0);
setGlobalState(USER_WON); // initial value will be set in component

const checkPlayerWon = counter => {
	if (counter >= 10) {
		setGlobalState(USER_WON, true);
	}
};
const congratUser = userWon => {
	if (userWon) {
		const points = getGlobalState(COUNTER);
		alert(`You have won with ${points} points!`);
	}
};

subGlobalState(COUNTER, checkPlayerWon);
subGlobalState(USER_WON, congratUser);


const resetGame = () => {
	resetGlobalStates([COUNTER, USER_WON]);
};

export const Component = () => {
	const [counter, setCounter] = useGlobalState(COUNTER);
	const [userWon, setUserWon] = useGlobalState(USER_WON, false);

	useEffect(() => {
		return () => {
			unsubGlobalState(COUNTER, checkPlayerWon);
			unsubGlobalState(USER_WON, congratUser);
		}
	},[]);

	return (
		<div>
			{!userWon ? (
				<>
					<span>{`Count is: ${counter}`}</span>
					<button onClick={() => setCounter(counter + 1)}>
						Inc
					</button>
					<button onClick={() => setGlobalState(COUNTER, counter - 1)}>
						Dec
					</button>
					<button onClick={() => updateGlobalState(COUNTER, state => state * state)}>
						Sqr
					</button>
					<button onClick={() => resetGlobalState(COUNTER)}>
						Reset
					</button>
				</>
			): (
				<>
					<h4>Congrats you have won!</h4>
					<button onClick={resetGame}>Restart Game</button>
				</>
			)}
		</div>
	);
};
```
----
License
MIT