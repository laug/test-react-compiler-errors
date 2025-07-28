
export default function App() {
  return (
   <TestReactCompilerProp myprop='hello' />
  )
}

function someFunction(name: string) {
  console.log(name);
  return { count: 4 };
}

export function TestReactCompilerProp(
  { myprop }: { myprop: string }
) {

  // uncomment this line to verify the playground does report linting errors:
  // myprop.a = 1 // Error: this value cannot be modified

  const handler = () => {
    const result = someFunction(myprop); // pass the prop

    // mutate the result
    result.count = 1;
    // above line causes linting error locally with 0.0.0-experimental-2db0664-20250725 but no error in playground
  };

  return <button onClick={handler}>label</button>;
}
