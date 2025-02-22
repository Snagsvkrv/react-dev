React component lifecycle

![reactLifecycle.png](imgs%2FreactLifecycle.png)

lets start by comparing it to the stages of a person's day.

In React, "lifecycle" refers to the different stages a component goes through from when it's created (born) to when it's removed from the screen (dies). Understanding this is crucial because different things need to happen at different stages of a component's life.

Let's break this down using both class components (the traditional way) and hooks (the modern way):

```javascript
// Traditional Class Component Lifecycle
class ExampleComponent extends React.Component {
  // 1. Birth (Mounting)
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // Like preparing for the day
  }

  componentDidMount() {
    // Like starting your day
    // This runs after the component appears on screen
    document.title = `Count is ${this.state.count}`;
  }

  // 2. Growth (Updating)
  componentDidUpdate(prevProps, prevState) {
    // Like responding to things during your day
    // This runs when the component's props or state change
    if (prevState.count !== this.state.count) {
      document.title = `Count is ${this.state.count}`;
    }
  }

  // 3. Death (Unmounting)
  componentWillUnmount() {
    // Like cleaning up before going to bed
    // This runs right before the component is removed
    document.title = 'React App';
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}

// Modern Hooks Approach - Same Lifecycle
function ExampleHookComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This combines componentDidMount and componentDidUpdate
    document.title = `Count is ${count}`;

    // The return function is like componentWillUnmount
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes

  return <div>{count}</div>;
}
```

Now, let's understand each lifecycle phase in detail:

1. Mounting (Birth):
   ```javascript
   function MountExample() {
     useEffect(() => {
       console.log("I've been born!");
       // Perfect time to:
       // - Load initial data
       // - Set up subscriptions
       // - Connect to external services
     }, []); // Empty array means "only run once when mounted"
   }
   ```

2. Updating (Growth):
   ```javascript
   function UpdateExample({ data }) {
     useEffect(() => {
       console.log("Something changed!");
       // Good time to:
       // - Update document title
       // - Save to localStorage
       // - Trigger animations
     }, [data]); // Run whenever 'data' changes
   }
   ```

3. Unmounting (Death):
   ```javascript
   function UnmountExample() {
     useEffect(() => {
       const subscription = setupSubscription();
       
       return () => {
         console.log("Cleaning up!");
         // Important to:
         // - Cancel subscriptions
         // - Clear intervals
         // - Remove event listeners
         subscription.unsubscribe();
       };
     }, []);
   }
   ```

Hooks made this lifecycle management more intuitive. Instead of spreading lifecycle logic across different methods, useEffect combines related code in one place. Here's a practical example combining all phases:

```javascript
function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Birth: Set up user data subscription
    console.log("Setting up user subscription");
    const subscription = subscribeToUser(userId, (data) => {
      setUserData(data);
    });

    // Growth: Log updates
    console.log("User data updated:", userData);

    // Death: Clean up subscription
    return () => {
      console.log("Cleaning up subscription");
      subscription.unsubscribe();
    };
  }, [userId]); // Re-run if userId changes

  return <div>{userData?.name}</div>;
}
```

Let me show you how React's lifecycle interacts with other key features through a comprehensive example. We'll build a component that demonstrates these interactions in a practical way.

```javascript
import React, { useState, useEffect, useRef, useCallback, useMemo, useContext } from 'react';

// First, let's create a context to demonstrate how lifecycle affects context updates
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);
  
  // Combine theme settings into a memoized value to prevent unnecessary rerenders
  const themeValue = useMemo(() => ({
    theme,
    fontSize,
    setTheme,
    setFontSize
  }), [theme, fontSize]);

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}

function DataDisplayComponent({ dataId }) {
  // State management
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Context consumption
  const { theme, fontSize } = useContext(ThemeContext);

  // Refs to track component lifecycle
  const mountTimeRef = useRef(Date.now());
  const updateCountRef = useRef(0);
  const timerRef = useRef(null);

  // Memoized expensive calculation
  const processedData = useMemo(() => {
    if (!data) return null;
    console.log('Processing data...'); // This won't run on every render
    return data.map(item => item * 2);
  }, [data]); // Only recalculate when data changes

  // Memoized event handler
  const handleDataUpdate = useCallback(() => {
    updateCountRef.current += 1;
    console.log(`Component updated ${updateCountRef.current} times`);
  }, []); // Never changes after initial creation

  // Primary useEffect for data fetching
  useEffect(() => {
    console.log('Mounting or dataId changed - Fetching new data');
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        // Simulated API call
        const response = await fetch(`/api/data/${dataId}`);
        const newData = await response.json();
        setData(newData);
        handleDataUpdate();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function runs before next effect or unmount
    return () => {
      console.log('Cleaning up previous data fetch');
      // Cancel any pending requests or subscriptions
    };
  }, [dataId, handleDataUpdate]);

  // Secondary useEffect for theme changes
  useEffect(() => {
    console.log(`Theme changed to ${theme}`);
    // Apply theme-specific setup
    document.body.style.backgroundColor = theme === 'light' ? '#ffffff' : '#333333';

    return () => {
      console.log('Cleaning up theme effects');
      // Reset any theme-specific changes
    };
  }, [theme]);

  // Timer setup useEffect
  useEffect(() => {
    console.log('Setting up interval timer');
    timerRef.current = setInterval(() => {
      const uptime = Date.now() - mountTimeRef.current;
      console.log(`Component uptime: ${uptime}ms`);
    }, 5000);

    // Cleanup interval on unmount
    return () => {
      console.log('Cleaning up interval timer');
      clearInterval(timerRef.current);
    };
  }, []); // Empty deps array = only run on mount and unmount

  // Event handlers
  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    // Trigger a new data fetch...
  }, []); // Memoized to prevent unnecessary rerenders

  // Calculate component age for each render
  const componentAge = Date.now() - mountTimeRef.current;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <h2>Data Display</h2>
      <p>Component age: {componentAge}ms</p>
      <p>Update count: {updateCountRef.current}</p>
      {processedData && (
        <ul>
          {processedData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <button onClick={handleRefresh}>Refresh Data</button>
    </div>
  );
}

// Usage example
function App() {
  return (
    <ThemeProvider>
      <DataDisplayComponent dataId="123" />
    </ThemeProvider>
  );
}
```

Let's break down how the lifecycle interacts with different React features in this example:

1. Context Integration:
    - The component subscribes to context changes as soon as it mounts
    - Context updates trigger re-renders, but useMemo prevents unnecessary recalculations
    - Theme changes trigger their own useEffect for side effects

2. Ref Persistence:
    - Refs maintain values across renders without triggering updates
    - They're perfect for tracking component lifetime metrics
    - Unlike state, ref updates don't cause re-renders

3. State Management:
    - State updates trigger re-renders
    - Multiple state updates in the same cycle are batched
    - State updates in useEffect can trigger additional lifecycle events

4. Performance Optimization:
    - useMemo prevents expensive calculations on every render
    - useCallback memoizes functions to prevent unnecessary effect triggers
    - Careful dependency arrays prevent infinite update loops

5. Cleanup and Resource Management:
    - Each useEffect can have its own cleanup function
    - Cleanup runs before the next effect execution and on unmount
    - Perfect for managing subscriptions, timers, and event listeners

This component demonstrates how React's lifecycle phases intersect with:
- Data fetching and error handling
- Theme and style management
- Performance optimization
- Resource cleanup
- Event handling
- Component metrics tracking