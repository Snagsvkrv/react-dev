# NOTES:

## React is a barebone minimal js library. Not a framework.

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