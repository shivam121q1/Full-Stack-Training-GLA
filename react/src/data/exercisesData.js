export const exercises = [
  {
    id: "01_props",
    title: "01 - Hello World & Props",
    level: "Basic",
    description: "Learn how to build React components and pass dynamic data using props.",
    objectives: [
      "Define a UserCard functional component that receives props.",
      "Render name, role, email, and a status badge based on props.",
      "Pass an array of hobbies/skills and render them using lists.",
      "Pass a function as a prop to handle button click actions."
    ],
    tips: [
      "Props stand for 'properties' and are read-only data passed from parent to child components.",
      "You can destructure props in the function arguments: `function Profile({ name, age })`.",
      "Pass values of other types (numbers, arrays, booleans, functions) inside curly braces: `age={25}`."
    ],
    boilerplateHint: `// Syntax Example:
function ProductCard({ title, price, inStock }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <span>{inStock ? "In Stock" : "Out of Stock"}</span>
    </div>
  );
}`
  },
  {
    id: "02_counter",
    title: "02 - Interactive Counter (State)",
    level: "Basic",
    description: "Understand state management using the `useState` hook and how to handle user clicks.",
    objectives: [
      "Initialize state for a counter with a default value of 0.",
      "Implement Increment and Decrement buttons.",
      "Add a Reset button that resets the counter to 0.",
      "Prevent the counter from going below 0 or above 10 (bounds validation) and display a warning."
    ],
    tips: [
      "State represents data that can change over time and triggers re-renders when updated.",
      "Import `useState` from the 'react' package: `import { useState } from 'react'`.",
      "Always call state updates using the setter function, e.g., `setCount(newVal)`."
    ],
    boilerplateHint: `// Syntax Example:
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`
  },
  {
    id: "03_toggles",
    title: "03 - Dynamic Toggles (Conditional)",
    level: "Basic",
    description: "Learn how to selectively render HTML elements and components using conditional logic.",
    objectives: [
      "Create a component with a boolean state toggle representing an 'Expand Details' action.",
      "Use ternary operators `? :` to toggle visible description text.",
      "Use short-circuit evaluations `&&` to render a bonus alerts banner if active.",
      "Toggle button text and styles (e.g. green for 'Activate', red for 'Deactivate')."
    ],
    tips: [
      "Use `&&` when you want to render a component if a condition is true, and nothing if it is false.",
      "Use ternary operators `condition ? trueVal : falseVal` when choosing between two layouts.",
      "Avoid writing large conditional blocks inside JSX. Extract them into variables or separate helper functions."
    ],
    boilerplateHint: `// Syntax Example:
{isLoggedIn ? <UserDashboard /> : <LoginForm />}
{isAdmin && <AdminSettingsPanel />}`
  },
  {
    id: "04_lists",
    title: "04 - Render Lists (Lists & Keys)",
    level: "Basic",
    description: "Render arrays of data dynamically using `.map()` and understand the importance of keys.",
    objectives: [
      "Render a list of fruits or courses from a static array.",
      "Render detailed table row cards containing Item Name, Price, and Category.",
      "Attach a unique `key` prop to the outer-most element of each item in the loop.",
      "Add a input search filter to search/filter elements dynamically by title."
    ],
    tips: [
      "Keys help React identify which items have changed, been added, or been removed.",
      "Never use array indices as keys if the items can change, reorder, or be deleted. Prefer unique IDs.",
      "Always put the `key` on the direct parent element returned in the `.map()` loop."
    ],
    boilerplateHint: `// Syntax Example:
const items = [{ id: 1, name: 'Apple' }, { id: 2, name: 'Banana' }];

return (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);`
  },
  {
    id: "05_forms",
    title: "05 - Controlled Forms",
    level: "Intermediate",
    description: "Manage form inputs, select options, checkboxes, and handle submission using controlled components.",
    objectives: [
      "Set up state variables for inputs: Username, Email, Course Select, and Agree checkbox.",
      "Handle updates dynamically using a single or multiple change handler functions.",
      "On form submit, perform validation (email structure, username length > 3).",
      "Display real-time validation errors and show a success summary upon valid submit."
    ],
    tips: [
      "In a controlled input, the React state is the 'single source of truth'.",
      "Assign the state value to the input's `value` attribute and update it in `onChange`.",
      "Always call `event.preventDefault()` in the `onSubmit` handler to prevent page reloads."
    ],
    boilerplateHint: `// Syntax Example:
const [name, setName] = useState('');
const handleSubmit = (e) => {
  e.preventDefault();
  alert('Submitted: ' + name);
};

return (
  <form onSubmit={handleSubmit}>
    <input value={name} onChange={(e) => setName(e.target.value)} />
  </form>
);`
  },
  {
    id: "06_fetching",
    title: "06 - API Fetching (useEffect)",
    level: "Intermediate",
    description: "Learn how to orchestrate side-effects like fetching data from external APIs using `useEffect`.",
    objectives: [
      "Trigger an API fetch call on component mount using `useEffect` with an empty dependency array.",
      "Fetch user data from `https://jsonplaceholder.typicode.com/users`.",
      "Manage and display three core states: Loading, Error, and Success (grid list).",
      "Provide a Refresh button to refetch/reload the data manually."
    ],
    tips: [
      "The empty dependency array `[]` ensures the effect runs only once when the component mounts.",
      "Always handle error catching using `.catch()` or `try-catch` blocks to prevent React crashes.",
      "Reset your state flags (e.g. error = null, loading = true) prior to initiating a new fetch query."
    ],
    boilerplateHint: `// Syntax Example:
useEffect(() => {
  fetch('https://api.com/items')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
}, []);`
  },
  {
    id: "07_listener",
    title: "07 - Window Event Listener",
    level: "Intermediate",
    description: "Learn how to register global event listeners in effects and why cleaning them up is critical.",
    objectives: [
      "Track the browser's current viewport width and height inside React state.",
      "Register a `resize` listener on the `window` object in `useEffect`.",
      "Return a cleanup function in `useEffect` to remove the resize event listener.",
      "Show a dynamic layout or styling adjustment when screen size crosses a mobile threshold (768px)."
    ],
    tips: [
      "Failing to clean up event listeners leads to memory leaks and unexpected behavior.",
      "The cleanup function is the function returned from inside your `useEffect` callback.",
      "Cleanups run when the component unmounts or before the effect runs again due to dependency updates."
    ],
    boilerplateHint: `// Syntax Example:
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', handleResize);
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`
  },
  {
    id: "08_lifting_state",
    title: "08 - Lifting State Up",
    level: "Intermediate",
    description: "Share and sync data between sibling components by moving the state to their closest common ancestor.",
    objectives: [
      "Create a parent component that contains a list of messages or tasks.",
      "Implement Sibling A (`MessageForm`) that accepts a callback prop to submit a new message.",
      "Implement Sibling B (`MessageList`) that accepts the messages array and renders it.",
      "Observe how updates in Sibling A instantly reflect inside Sibling B."
    ],
    tips: [
      "In React, data flows downward (top-down / unidirectional data flow).",
      "To share state between siblings, hoist the state to the parent component.",
      "Pass the state value to the display sibling, and pass a state-modifying function to the writer sibling."
    ],
    boilerplateHint: `// Syntax Example:
function Parent() {
  const [data, setData] = useState([]);
  return (
    <>
      <SiblingInput onAdd={(item) => setData([...data, item])} />
      <SiblingList items={data} />
    </>
  );
}`
  },
  {
    id: "09_context",
    title: "09 - Theme Context API",
    level: "Advanced",
    description: "Avoid prop drilling by sharing global state (like UI theme) across the entire application using Context.",
    objectives: [
      "Create a Context object using `createContext()`.",
      "Build a `ThemeProvider` component managing active theme state ('dark' or 'light').",
      "Expose the current theme value and a toggle function inside the Context Provider.",
      "Consume Context values in multiple deep nested child components using the `useContext` hook."
    ],
    tips: [
      "Context is designed to share global data (like themes, user auth, or language preferences).",
      "Do not use Context as a replacement for all local state; it can cause unnecessary renders.",
      "Wrap components that need access to the data inside `<MyContext.Provider value={...}>`."
    ],
    boilerplateHint: `// Syntax Example:
const MyContext = createContext();

function App() {
  return (
    <MyContext.Provider value={{ value: 'hello' }}>
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  const ctx = useContext(MyContext);
  return <div>{ctx.value}</div>;
}`
  },
  {
    id: "10_reducer",
    title: "10 - Shopping Cart (useReducer)",
    level: "Advanced",
    description: "Manage complex, multi-action states using the `useReducer` hook, mirroring Redux patterns.",
    objectives: [
      "Define a reducer function with actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, and `CLEAR_CART`.",
      "Initialize default cart state as an empty list `[]`.",
      "Display items with controls to increment/decrement item amounts and calculate the overall total price.",
      "Use `dispatch({ type: 'ACTION_TYPE', payload: data })` to handle changes."
    ],
    tips: [
      "Use `useReducer` instead of `useState` when you have complex state transitions that depend on previous states.",
      "A reducer is a pure function: `(state, action) => newState`.",
      "Always return a *new* object/array state rather than mutating the current state directly."
    ],
    boilerplateHint: `// Syntax Example:
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    default: throw new Error();
  }
};
const [state, dispatch] = useReducer(reducer, { count: 0 });`
  },
  {
    id: "11_custom_hooks",
    title: "11 - Reusable Custom Hooks",
    level: "Advanced",
    description: "Extract component logic into reusable functions called Custom Hooks to keep code clean and DRY.",
    objectives: [
      "Create a custom hook `useFetch(url)` returning `{ data, loading, error, refetch }`.",
      "Create a custom hook `useLocalStorage(key, defaultValue)` that automatically syncs and persists value in storage.",
      "Integrate both hooks within a single component showing live weather or profiles and local preferences.",
      "Ensure custom hooks begin with the prefix `use`."
    ],
    tips: [
      "Custom hooks allow you to share stateful logic, NOT actual state itself. Each call gets isolated state.",
      "Hooks must only be called at the top level of React functions, not inside loops or conditionals.",
      "You can call standard React hooks (`useState`, `useEffect`, etc.) inside a custom hook."
    ],
    boilerplateHint: `// Syntax Example:
function useToggle(initialVal = false) {
  const [val, setVal] = useState(initialVal);
  const toggle = () => setVal(v => !v);
  return [val, toggle];
}`
  },
  {
    id: "12_optimization",
    title: "12 - Performance (Memo & Callbacks)",
    level: "Advanced",
    description: "Understand performance tuning and how to avoid heavy computations or re-renders using `useMemo` and `useCallback`.",
    objectives: [
      "Create a heavy calculations helper (e.g. searching/sorting through a list of 5,000 items).",
      "Wrap the heavy computation in `useMemo` so it recalculates only when inputs change.",
      "Pass a function down to a memoized child component (`React.memo`).",
      "Wrap this callback function in `useCallback` to prevent the child from re-rendering on every parent state change."
    ],
    tips: [
      "Only optimize when you observe noticeable lag or redundant rendering. Early optimization can clutter code.",
      "`useMemo` returns a memoized value. `useCallback` returns a memoized function.",
      "Verify changes by logging statements or using the React Developer Tools Profiler."
    ],
    boilerplateHint: `// Syntax Example:
const cachedValue = useMemo(() => heavyCompute(a, b), [a, b]);
const cachedFn = useCallback(() => doSomething(a), [a]);`
  }
];
