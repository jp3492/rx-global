# React-Global-State-Hook

A simple wrapper around React.useState to keep global state.
Every state/store is set, read and subscribed to by unique id.

## Reference

`npm i --save react-global-state-hook`

```javascript
import {
    useGlobalState,
    getGlobalState,
    setGlobalState
} from 'react-global-state-hook';
```
##### useGlobalState(id: string, initialValue: any):
#
```javascript
// React Hooks rules apply!
const [state, setState] = useGlobalState("UNIQUE_ID", 0);
```

##### getGlobalState(id: string):
#
```javascript
const getStateFromAnywhere = (UNIQUE_ID) => {
    return getGlobalState(UNIQUE_ID);
}
```
##### setGlobalState(id: string, value: any):
#
```javascript
const updateStateFromAnywhere = (UNIQUE_ID, newState) => {
    setGlobalState(UNIQUE_ID, newState);
}
```
## Example

```javascript
import {
    useGlobalState,
    getGlobalState,
    setGlobalState
} from 'react-global-state-hook';

const UNIQUE_ID = "MY_COUNTER";

export const Component = () => {
    const [counter, setCounter] = useGlobalState(UNIQUE_ID, 0);

    const handleIncrement = () => {
        setCounter(counter + 1);
    }

    return (
        <div>
            <span>{`Count is: ${counter}`}</span>
            <button onClick={handleIncrement}>Increment</button>
            <DecrementButton />
        </div>
    )
}

const handleDecrement = () => {
    const oldState = getGlobalState(UNIQUE_ID);
    setGlobalState(UNIQUE_ID, oldState - 1);
}

const DecrementButton = () => (
    <button onClick={handleDecrement}>Decrement</button>
)
```
### Todos

 - Publish React-Global-Reducer-Hook

License
----

MIT
