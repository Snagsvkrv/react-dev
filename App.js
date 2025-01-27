import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById("root"))

const parent = React.createElement("div", {id: 'parent'},
	[React.createElement("div", {id: 'child1'},
		[React.createElement("h1", {id: 'h1'}, 'Hello ! Lets Begin React Learning !'),
			React.createElement("h2", {id: 'h2'}, 'This is an array of children !')]),
		React.createElement("div", {id: 'child2'},
			[React.createElement("h1", {id: 'h1'}, 'Hello ! Lets Begin React Learning !'),
				React.createElement("h2", {id: 'h2'}, 'This is an array of children !')])])
// root.render(parent)

// JSX
const jsxHeading = <h1 id='jsxHeading' className='jsxHeading'>Hello JSX !</h1>
const jsxMultilineHeading = (<h1 id='jsxMultilineHeading' className='jsxHeading'>
	Hello JSX Multiline Heading !
</h1>)
// root.render(
// 	<>
// 		{jsxHeading}
// 		{jsxMultilineHeading}
// 	</>
// )

const JSXHeadingComponent = () => <h1 id='jsxHeadingComponent' className='jsxHeading'>JSXHeadingComponent</h1>
// const JSXTitleComponent = () => <h1 id='jsxTitleComponent' className='jsxTitle'>JSXTitleComponent</h1>
// root.render(
// 	<>
// 		<JSXHeadingComponent/>
// 		<JSXTitleComponent/>
// 	</>)

const JSXTitleComponent = () => <h1 id='jsxTitleComponent' className='jsxTitle'><JSXHeadingComponent />JSXTitleComponent</h1>
root.render(<JSXTitleComponent />)
