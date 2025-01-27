# NOTES:

* [NOTES:](#notes)
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
    * [Main Purpose:](#main-purpose)
      * [Modern JS/JSX code](#modern-jsjsx-code)
      * [Babel transforms it to](#babel-transforms-it-to)
    * [Key Features:](#key-features)

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

## React Component
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
