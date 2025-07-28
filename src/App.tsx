import { useEffect } from "react";

export default function App() {
  return (
    <TestReactCompilerProp myprop='hello' person={{ name: 'John' }} />
  )
}

type Person = {
  name: string;
}

function someFunction(name: string) {
  console.log(name);
  return { count: 4 };
}

export function TestReactCompilerProp(
  { myprop, person }: { myprop: string, person: Person }
) {

  // check that react-hooks is running: it correctly reports the missing dependency
  useEffect(() => {
    console.log(myprop);
  }, []) // React Hook useEffect has a missing dependency: 'myprop'

  // check that react-hooks reports basic compiler errors: it does NOT:
  person.name = 'Mike' // expected: Error: this value cannot be modified
  // Result: above line is correctly reported as an error in the playground, but is NOT reported as an error using "eslint-plugin-react-hooks@0.0.0-experimental-19baee81-20250725"

  const handler = () => {
    const result = someFunction(myprop); // pass the prop

    // mutate the result
    result.count = 1;
    // above line causes linting error locally with "eslint-plugin-react-compiler@0.0.0-experimental-2db0664-20250725" but no error in playground
  };

  return <button onClick={handler}>label</button>;
}
