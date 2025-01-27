/** React.createElement() is a core React method that creates a React element
        It takes 3 arguments:
         First argument "h1": The type of HTML element to create
         Second argument {}: An object for props/attributes (empty in this case)
         Third argument: The content/children inside the element (here it's the text)
        This creates a React element, but it's not yet in the DOM */
const heading = React.createElement("h1", {}, "Hello ! Lets Begin React Learning !")

/** document.getElementById("root") finds a DOM element with id="root"
        ReactDOM.createRoot() creates a React root container in that DOM element
         This is where your React application will live
         The root container is stored in the root variable */
const root = ReactDOM.createRoot(document.getElementById("root"))

/** The render() method takes the React element and actually puts it in the DOM
        It converts our React element into real DOM elements that show up on the page */
root.render(heading)

/**
 * This is the most basic way to use React - nowadays most developers use JSX instead of createElement() directly, which would look like:
         But under the hood, JSX is converted to createElement() calls just like in example.
         For this we will be also require to add Babel.
         <script src="https://unpkg.com/@babel/standalone/babel.min.js">
         and add script type="text/babel"> at line 11*/
// const heading_jsx = <h1>Hello ! Lets Begin React Learning !</h1>
// root.render(heading_jsx)