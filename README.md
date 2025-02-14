

## [React](https://react.dev/) 
is a barebone minimal js library. Not a framework.

## react.development.js
is the main React library that contains the core functionality for:
- Creating React elements
- Working with components
- Managing state and props
- Implementing hooks
- Handling lifecycle methods

## react-dom.development.js
is the React DOM-specific package that:
- Provides DOM-specific methods for rendering React components
- Handles browser DOM manipulation
- Manages event handling
- Provides methods like ReactDOM.render() to mount React apps

## What is crossorigin in script tag?
crossorigin attribute is a CORS (Cross-Origin Resource Sharing) setting that determines how the browser handles requests for resources (like scripts) from different domains.
When you load resources from a different domain (like unpkg.com in this case), it's considered a cross-origin request. The crossorigin attribute helps manage security for these requests:

Without crossorigin:
- Browser will load the script
- But error details will be limited if the script fails
- You'll see generic errors like "Script error"

With crossorigin:
- Enables detailed error reporting
- Allows you to see full error stack traces
- Helps with debugging when using external scripts

There are two possible values:

>crossorigin="anonymous"  // Default when just using crossorigin

> crossorigin="use-credentials"  // For requests that need credentials

## [Parcel](https://parceljs.org/)
- Dev Build
- Local Server
- HMR - Hot Module Replacement
- File Watching Algorithm - written in c++

### Here's how it typically works:

1 - Initial Scanning : Creates a snapshot of the watched files/directories
Records metadata like file sizes, timestamps, and hashes

2 - Monitoring Methods:

a) Polling : Periodically checks files for changes. Compares current state with previous snapshot. Less efficient but more compatible
Example: fs.watchFile() in Node.js

b) Event-based : Uses OS-level file system events. More efficient but platform-dependent
Example: fs.watch() in Node.js

c) Hybrid : Combines both approaches. Falls back to polling when events aren't reliable

## [JSX](https://facebook.github.io/jsx/)
HTML like or XML like syntax
#### React code
`const parent = React.createElement("div", {id: 'parent'}, 'Hello')`
#### JSX code
`const parent = <div id='parent'> Hello </div>`

under the hood, JSX is converted to createElement() calls 

## [Babel](https://babeljs.io/)
is a JS compiler / transpiler
>JSX => React.createElement => ReactElement-JS Object => HTMLElement(render)
### Main Purpose
- Converts modern JavaScript code into backwards-compatible version
- Transforms JSX into regular JavaScript
- Allows you to use the latest JavaScript features even in older browsers

`Modern JS/JSX code`
```jsx
const greeting = () => <h1>Hello, {name}!</h1>;
```

`Babel transforms it to`
```react
 var greeting = function greeting() { 
    return React.createElement("h1", null, "Hello, ", name, "!"); 
 };
```

### Key Features
- JSX transformation for React
- Converting ES6+ features (arrow functions, classes, etc.)
- Converting modern JavaScript modules
- Polyfill support for new JavaScript features

## React Component - templates/factories that produce Elements
### Class Components (Legacy Approach)
  ```jsx
  Class Welcome extends React.Component {
      render() {
          return <h1>Hello, {this.props.name}</h1>
    }
  }
```
### Function Components (Modern Approach)
**Should be starting in Capital Letters**
  ```jsx
// Simple Function Component
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
// Arrow Function Component
  const Welcome = (props) => {
	return <h1>Hello, {this.props.name}</h1>
  }
	// or
  const Welcome = (props) => <h1>Hello, {this.props.name}</h1>;
  ```

## React Element V/S React Component
Key Differences:
- React Elements
  - Are plain objects describing what you want to see on the screen
  - Created using JSX or React.createElement()
  - Immutable
  - Cheaper and simpler
  - Like the blueprint of what to render
- React Components
  - Are functions or classes that take props and return React Elements
  - Can hold logic, state, and lifecycle methods
  - Can be reused
  - Like a factory that creates elements
  - Always start with a capital letter
```jsx
// This is a React Element
const element = <h1>Hello World</h1>;

// This is a React Component
function Greeting() {
  // Components can contain elements and other components
  return (
    <div>
      {element}
      <h2>Welcome to React</h2>
    </div>
  );
}

// Using the component creates an element
const elementFromComponent = <Greeting />;
```

## What is Props in react?
are React's way of passing data from a parent component to a child component. They're essentially the React equivalent of function parameters.
```jsx
function ParentComponent() {
  return (
    <ChildComponent name="John" age={25} />
  );
}

// Child component
function ChildComponent(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}
```
#### Key things to understand about props:

- Props are read-only - a child component can never modify the props it receives
- Props can be any type of data - strings, numbers, arrays, objects, functions
- Props help make components reusable since you can pass different values each time

You can also destructure props for cleaner code:
```jsx
function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

## Keys in React 
serve a crucial purpose for performance and correct behavior when rendering lists of elements. Let me explain with clear examples:
- Performance and Reconciliation
  ```jsx
  // Without keys - React doesn't know which items changed
  const TodoList = () => {
  const todos = ['Write code', 'Test app', 'Deploy'];
  return (
    <ul>
      {todos.map(todo => (
        <li>{todo}</li>  // React will re-render all items unnecessarily
      ))}
    </ul>
    );
  };

  // With keys - React can identify each item
  const TodoList = () => {
  const todos = ['Write code', 'Test app', 'Deploy'];
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>  // React can track individual items
       ))}
    </ul>
    );
  };
  ```
- State Preservation
  ```jsx
  import React, { useState } from 'react';
  import { Button } from '@/components/ui/button';
  
  const CounterItem = ({ name }) => {
    const [count, setCount] = useState(0);
    return (
      <div className="p-4 border rounded-lg mb-2 flex items-center justify-between">
        <span>{name}: {count}</span>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </div>
    );
  };
  
  const KeysDemoApp = () => {
  const [items, setItems] = useState(['Item A', 'Item B', 'Item C']);
  
  const moveFirstToLast = () => {
    setItems(prev => {
      const newItems = [...prev];
      const first = newItems.shift();
      newItems.push(first);
      return newItems;
    });
  };
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <Button onClick={moveFirstToLast}>Move First Item to Last</Button>
      </div>
  
      <div className="mb-8">
        <h3 className="font-bold mb-2">Without Keys:</h3>
        {items.map((item) => (
					<CounterItem name={item} />
        ))}
      </div>
  
      <div>
        <h3 className="font-bold mb-2">With Keys:</h3>
        {items.map((item) => (
            <CounterItem key={item} name={item} />
        ))}
      </div>
    </div>
    );
  };
  
  export default KeysDemoApp;
  ```
- Rules:
  - Keys must be unique among siblings
  - Keys should be stable, predictable, and unique
  - Don't generate keys on the fly (like Math.random())
  - Don't use indexes as keys if the list can change. This is an <b>ANTI PATTERN</b>

## Hooks in React
React Hooks are functions that allow you to "hook into" React state and lifecycle features from function components.

Some most commonly used hooks:
- **useState** - Lets you add state to a function component
```js
const [count, setCount] = useState(0);
```
- **useEffect** - Handles side effects like data fetching, subscriptions, or DOM manipulation
```js
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // Only re-run when count changes
```
- **useRef** - Creates a mutable reference that persists across renders
```js
const inputRef = useRef(null);
// Later: inputRef.current.focus();
```
- **useContext** - Subscribes to React context
- **useMemo** - Memoizes expensive computations
- **useCallback** - Memoizes functions to prevent unnecessary re-renders
- **useReducer** - Manages complex state logic, similar to Redux

#### The key rules for using hooks are:

- Only call hooks at the top level (not inside loops, conditions, or nested functions)
- Only call hooks from React function components or custom hooks
- Custom hooks should start with "use" (e.g., useWindowSize)