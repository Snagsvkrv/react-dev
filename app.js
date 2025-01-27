/** React.createElement() is a core React method that creates a React element
        It takes 3 arguments:
         First argument "h1": The type of HTML element to create
         Second argument {}: An object for props/attributes
         Third argument: The content/children inside the element (here it's the text)
        This creates a React element, but it's not yet in the DOM */
const heading = React.createElement("h1", {
  id: "heading"
}, "Hello ! Lets Begin React Learning !")

/** document.getElementById("root") finds a DOM element with id="root"
        ReactDOM.createRoot() creates a React root container in that DOM element
         This is where your React application will live
         The root container is stored in the root variable */
const root = ReactDOM.createRoot(document.getElementById("root"))

/** The render() method takes the React element and actually puts it in the DOM
        It converts our React element into real DOM elements that show up on the page */
// root.render(heading)

/**
 * This is the most basic way to use React - nowadays most developers use JSX instead of createElement() directly, which would look like:
         But under the hood, JSX is converted to createElement() calls just like in example.
         For this we will be also require to add Babel.
         <script src="https://unpkg.com/@babel/standalone/babel.min.js">
         and add script type="text/babel"> at line 11*/
// const heading_jsx = <h1>Hello ! Lets Begin React Learning !</h1>
// root.render(heading_jsx)

/**
 lets try to create a structure as:
 <div id="parent">
  <div id="child">
    <h1>Hello ! Lets Begin React Learning !</h1>
  </div>
 </div>
 * */
/**
 FYI:  We will get this error in array of children for below code.
 Warning: Each child in a list should have a unique "key" prop.
 Check the top-level render call using <div>. See https://reactjs.org/link/warning-keys for more information.*/

// const parent = React.createElement("div", {id: 'parent'},
//   React.createElement("div", {id: 'child'},
//     [React.createElement("h1", {id: 'h1'}, 'Hello ! Lets Begin React Learning !'),
//       React.createElement("h2", {id: 'h2'}, 'This is an array of children !')]))
// root.render(parent)

/**
 lets try to create a structure as:
 <div id="parent">
  <div id="child1">
    <h1>Hello ! Lets Begin React Learning !</h1>
   <h2>This is an array of children !</h2>
  </div>
   <div id="child2">
    <h1>Hello ! Lets Begin React Learning !</h1>
   <h2>This is an array of children !</h2>
  </div>
 </div>
 * */
const parent = React.createElement("div", {id: 'parent'},
  [React.createElement("div", {id: 'child1'},
    [React.createElement("h1", {id: 'h1'}, 'Hello ! Lets Begin React Learning !'),
      React.createElement("h2", {id: 'h2'}, 'This is an array of children !')]),
    React.createElement("div", {id: 'child2'},
      [React.createElement("h1", {id: 'h1'}, 'Hello ! Lets Begin React Learning !'),
        React.createElement("h2", {id: 'h2'}, 'This is an array of children !')])])
root.render(parent)

// The above code is very untidy, this is where JSX comes into place