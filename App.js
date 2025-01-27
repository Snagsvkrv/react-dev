import React from 'react';
import ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById("root"))

const parent = React.createElement("div", {id: 'parent'},
	[React.createElement("div", {id: 'child1'},
		[React.createElement("h1", {id: 'h1'}, 'Hello ! Lets Begin React Learning !'),
			React.createElement("h2", {id: 'h2'}, 'This is an array of children !')]),
		React.createElement("div", {id: 'child2'},
			[React.createElement("h1", {id: 'h1'}, 'Hello ! Lets Begin React Learning !'),
				React.createElement("h2", {id: 'h2'}, 'This is an array of children !')])])
root.render(parent)