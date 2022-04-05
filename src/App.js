import "./styles.css";
import { useState, createContext, useContext } from "react";

// App -> ComponentA -> ComponentB -> ComponentC
// App -> ComponentC
// const App = () => {
//   const username = "noobmaster69";
//   const isAuthenticated = true;
//   return <ComponentA username={username} isAuthenticated={isAuthenticated} />;
// };

// function ComponentA(props) {
//   return (
//     <ComponentB
//       username={props.username}
//       isAuthenticated={props.isAuthenticated}
//     />
//   );
// }

// function ComponentB(props) {
//   return (
//     <ComponentC
//       username={props.username}
//       isAuthenticated={props.isAuthenticated}
//     />
//   );
// }

// function ComponentC(props) {
//   return (
//     <div>
//       {props.isAuthenticated ? <h1>Welcome, {props.username}</h1> : null}
//     </div>
//   );
// }

const UserContext = createContext();

const UserProvider = (props) => {
  return (
    <UserContext.Provider
      // values we expect to receive later on
      value={{
        username: props.username,
        count: props.count,
        increment: props.increment
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

// App -> ComponentA -> ComponentB -> ComponentC
// App -> ComponentC
function App() {
  const [count, setCount] = useState(0);
  const username = "noobmaster69";

  function increment() {
    setCount(count + 1);
  }

  return (
    <UserProvider username={username} count={count} increment={increment}>
      <ComponentA />
    </UserProvider>
  );
}

function ComponentA() {
  return <ComponentB />;
}

function ComponentB() {
  return <ComponentC />;
}

function ComponentC() {
  const userConsumer = useContext(UserContext);

  return (
    <div>
      <h1>Welcome, {userConsumer.username}</h1>
      <h2>Count: {userConsumer.count}</h2>
      <button onClick={userConsumer.increment}>Increment</button>
    </div>
  );
}

export default App;
