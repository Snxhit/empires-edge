import { h, render } from 'https://esm.sh/preact';
import { useState } from 'https://esm.sh/preact/hooks';

function Game() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);
  return (
    h('div', null, [
      h('h1', null, 'Tester Counter'),
      h('p', null, `Current Count: ${count}`),
      h('button', { onClick: handleClick }, 'Increment!')
    ])
  );
}

render(h(Game), document.getElementById('game'));
