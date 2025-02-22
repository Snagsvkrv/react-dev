<!-- TOC -->
  * [React](#react-)
  * [react.development.js](#reactdevelopmentjs)
  * [react-dom.development.js](#react-domdevelopmentjs)
  * [What is crossorigin in script tag?](#what-is-crossorigin-in-script-tag)
  * [Parcel](#parcel)
    * [Here's how it typically works:](#heres-how-it-typically-works)
  * [JSX](#jsx)
      * [React code](#react-code)
      * [JSX code](#jsx-code)
  * [Babel](#babel)
    * [Main Purpose](#main-purpose)
    * [Key Features](#key-features)
  * [React Component - templates/factories that produce Elements](#react-component---templatesfactories-that-produce-elements)
    * [Class Components (Legacy Approach)](#class-components-legacy-approach)
    * [Function Components (Modern Approach)](#function-components-modern-approach)
  * [React Element V/S React Component](#react-element-vs-react-component)
  * [What is Props in react?](#what-is-props-in-react)
      * [Key things to understand about props:](#key-things-to-understand-about-props)
  * [Keys in React](#keys-in-react-)
  * [Hooks in React](#hooks-in-react)
      * [The key rules for using hooks are:](#the-key-rules-for-using-hooks-are)
  * [React reconciliation algorithm AND React Fiber](#react-reconciliation-algorithm-and-react-fiber)
    * [Reconciliation Algorithm:](#reconciliation-algorithm)
    * [React Fiber:](#react-fiber)
  * [Virtual DOM vs Actual DOM](#virtual-dom-vs-actual-dom)
  * [Combining above knowledge:](#combining-above-knowledge)
<!-- TOC -->

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
All React components must act like pure functions with respect to their props.
### Class Components (Legacy Approach)
  ```jsx
  Class Welcome extends React.Component {
      render() {
          return <h1>Hello, {this.props.name}</h1>
    }
  }
```
### Function Components (Modern Approach)
**Should be starting in Capital Letters** - https://legacy.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized
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
- React Elements: An element is not an actual instance. Rather, it is a way to tell React what you want to see on the screen. You can’t call any methods on the element. `It’s just an immutable description object with two fields: type: (string | ReactClass) and props: Object`
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

## React reconciliation algorithm AND React Fiber
Let me explain React's reconciliation algorithm and React Fiber:

### Reconciliation Algorithm:
This is React's process of determining what parts of a UI need to be updated when state or props change. Here's how it works:

1. Two trees comparison:
```javascript
// Old Virtual DOM
<div>
  <h1>Hello</h1>
  <p>Old text</p>
</div>

// New Virtual DOM after state change
<div>
  <h1>Hello</h1>
  <p>New text</p>
</div>
```

2. Key diffing rules:
- Different element types are rebuilt completely
- Same element types are updated with new props
- List items with keys are tracked across renders

### React Fiber:
React Fiber is NOT the same as reconciliation - it's actually a complete rewrite of React's core algorithm introduced in React 16. Here are the key differences:

1. Fiber is about HOW updates are scheduled and processed:
```javascript
// Example of work that Fiber can break into chunks
const heavyComponent = () => {
  // Fiber can pause here if needed
  expensiveCalculation();
  
  // And resume later
  return <div>{result}</div>;
};
```

2. Main features of Fiber:
- Ability to pause and resume work
- Ability to assign priority to different types of updates
- New error boundaries
- Better support for concurrent mode

Key Differences:
- Reconciliation: The algorithm that determines WHAT needs to change
- Fiber: The mechanism for HOW and WHEN those changes are made

An example showing priorities:
```javascript
// High priority update (user input)
const handleInput = (e) => {
  setInputValue(e.target.value); // Processed immediately
};

// Low priority update (data fetch)
const loadData = async () => {
  const data = await fetchData();
  setBackgroundData(data); // Can be interrupted if needed
};
```

Before Fiber, React would process all updates in a single, uninterruptible sweep. With Fiber:
1. Work can be split into chunks
2. Updates can be prioritized
3. Progress can be saved and resumed
4. Previous work can be reused or aborted

The relationship is that Fiber is the new implementation of the reconciliation algorithm, providing more granular control over the rendering process.

## Virtual DOM vs Actual DOM
Key differences between Virtual DOM and Actual DOM with examples:

Virtual DOM:
- A lightweight JavaScript object representation of the Actual DOM
- In-memory representation that's much faster to manipulate
- React creates and works with this first before updating the real DOM

Here's what the same structure looks like in both:

Actual DOM:
```html
<div class="user-info">
    <h1>John Doe</h1>
    <p class="age">30</p>
</div>
```

Virtual DOM representation:
```javascript
{
    type: 'div',
    props: {
        className: 'user-info',
        children: [
            {
                type: 'h1',
                props: {
                    children: 'John Doe'
                }
            },
            {
                type: 'p',
                props: {
                    className: 'age',
                    children: '30'
                }
            }
        ]
    }
}

// we can also do console.log(<Body />) i.e. any Component to see virtual DOM 
```

Key Differences:

1. Performance:
```javascript
// Actual DOM - Expensive
document.getElementById('user-age').innerHTML = '31';
document.getElementById('user-name').innerHTML = 'Jane';

// Virtual DOM - React batches these changes
setState({
    age: 31,
    name: 'Jane'
    // React will batch and optimize these updates
});
```

2. Properties and Manipulation:
```javascript
// Actual DOM - Many properties
const actualElement = document.getElementById('user');
actualElement.innerHTML = 'New Content';
actualElement.className = 'new-class';
actualElement.style.display = 'block';

// Virtual DOM - Simplified representation
const virtualElement = {
    type: 'div',
    props: {
        children: 'New Content',
        className: 'new-class',
        style: { display: 'block' }
    }
}
```

3. Update Process:
```javascript
// When state changes in React
function UserComponent({ name, age }) {
    // React first updates Virtual DOM
    return (
        <div>
            <h1>{name}</h1>
            <p>{age}</p>
        </div>
    );
    // Then compares with previous Virtual DOM
    // Finally updates only necessary parts of Actual DOM
}
```

Benefits of Virtual DOM:
1. Faster manipulation (changes happen in memory first)
2. Cross-platform compatibility (can be used with non-browser environments)
3. Batch updates (multiple changes are processed together)
4. More efficient (only necessary DOM updates are made)

When React updates:
1. Creates new Virtual DOM tree
2. Compares (diffs) with previous Virtual DOM tree
3. Calculates minimal number of necessary changes
4. Updates only those parts in the Actual DOM

This process makes React's rendering more efficient than directly manipulating the Actual DOM, especially for complex, dynamic UIs with frequent updates.

## Combining above knowledge:
Top-Down Reconciliation

```jsx
  // When you call:
  ReactDOM.render({
    type: Form,
    props: {
      isSubmitted: false,
      buttonText: 'OK!'
    }
  }, document.getElementById('root'));
  // React will ask the Form component what element tree it returns, given those props.
  // It will gradually “refine” its understanding of your component tree in terms of simpler primitives:

  // React: You told me this...
  {
    type: Form,
    props: {
      isSubmitted: false,
      buttonText: 'OK!'
    }
  }

  // React: ...And Form told me this...
  {
	type: Button,
    props: {
      children: 'OK!',
      color: 'blue'
	}
  }

  // React: ...and Button told me this! I guess I'm done.
  {
    type: 'button',
    props: {
      className: 'button button-blue',
      children: {
        type: 'b',
        props: {
          children: 'OK!'
        }
      }
    }
  }

```
This is a part of the process that React calls reconciliation which starts when you call `ReactDOM.render() or setState()`.
By the end of the reconciliation, React knows the resulting DOM tree, and a renderer like react-dom or react-native applies the minimal set of changes necessary to update the DOM nodes (or the platform-specific views in case of React Native).

This gradual refining process is also the reason React apps are easy to optimize. 
If some parts of your component tree become too large for React to visit efficiently, you can tell it to skip this “refining” and diffing certain parts of the tree if the relevant props have not changed. 
It is very fast to calculate whether the props have changed if they are immutable, so React and immutability work great together, and can provide great optimizations with the minimal effort.