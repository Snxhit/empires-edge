const { h, render } = window.preact;
const { useState } = window.preactHooks;

function Game() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);

  return (
    <div>
      <h1>Tester Counter</h1>
      <p>Current Count: {count}</p>
      <button onClick={handleClick}>Increment!</button>
    </div>
  );
}

render(<Game />, document.getElementById('game'));
