# Important notes wrt syntax
## Siblings
Below code written using the Fragment shorthand syntax (<>):
```jsx
const jsxHeading = <h1 id='jsxHeading' className='jsxHeading'>Hello JSX !</h1>
const jsxMultilineHeading = (<h1 id='jsxMultilineHeading' className='jsxHeading'>
	Hello JSX Multiline Heading !
</h1>)
root.render(
	<>
		{jsxHeading}
		{jsxMultilineHeading}
	</>
)
```

This can also be written as below:
1. Using div wrapper
   ```jsx
   root.render(
     <div>
       {jsxHeading}
       {jsxMultilineHeading}
     </div>
   );
   ```
2. Using React.Fragment
    ```jsx
    root.render(
      <React.Fragment>
        {jsxHeading}
        {jsxMultilineHeading}
      </React.Fragment>
    );
    ```
3. Or define them together
    ```jsx
    const headings = (
      <>
        <h1 id='jsxHeading' className='jsxHeading'>
          Hello JSX !
        </h1>
        <h1 id='jsxMultilineHeading' className='jsxHeading'>
          Hello JSX Multiline Heading !
        </h1>
      </>
    );
    
    root.render(headings);
    ```
   
## Child
```jsx
const jsxHeading = <h1 id='jsxHeading' className='jsxHeading'>Hello JSX !</h1>
const jsxMultilineHeading = (<h2 id='jsxMultilineHeading' className='jsxHeading'>
    Hello JSX Multiline Heading !
</h2>)
```
1. Using React.cloneElement:
    ```jsx
    root.render(
        React.cloneElement(jsxHeading, null, [
            jsxHeading.props.children,
            jsxMultilineHeading
        ])
    );
    ```
2. Using children prop:
    ```jsx
    root.render(
      <div>
        {React.cloneElement(jsxHeading, {
          children: [
            jsxHeading.props.children,
            jsxMultilineHeading
          ]
        })}
      </div>
    );
    ```
3. Creating a new element
    ```jsx
    root.render(
      <h1 id='jsxHeading' className='jsxHeading'>
        {jsxHeading.props.children}
        {jsxMultilineHeading}
      </h1>
    );
    ```
4. Using React.crateElement
    ```jsx
    root.render(
      React.createElement('h1',
        { id: 'jsxHeading', className: 'jsxHeading' },
        jsxHeading.props.children,
        jsxMultilineHeading
      )
    );
    ```
   
## Function Component
Sample components
   ```jsx
    const withLogger = (WrappedComponent) => {
      return (props) => {
         console.log('Component rendered with props:', props);
         return <WrappedComponent {...props} />;
      }
   }
   ```
   ```jsx
   function ControlledInput() {
      const [value, setValue] = useState('');
      return (
			<input
                   value={value}
                   onChange={(e) => setValue(e.target.value)}
           />
      );
  }
   ```
   ```jsx
   function UserContainer() {
	  const [users, setUsers] = useState([]);
      useEffect(() => {
        fetchUsers().then(setUsers);
      }, []);
      return <UserList users={users} />;
    }
   ```
## Component composition
   ```jsx
    const JSXHeadingComponent = () => <h1 id='jsxHeadingComponent' className='jsxHeading'>JSXHeadingComponent</h1>
    const JSXTitleComponent = () => <h1 id='jsxTitleComponent' className='jsxTitle'><JSXHeadingComponent />JSXTitleComponent</h1>
    root.render(<JSXTitleComponent />)
   ```