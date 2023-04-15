import { useEffect } from "react";
import { algodClient } from "./AlgoProvider";

const App = () => {

  useEffect(() => {
    algodClient.status().do().then( s =>
      console.log(s)
    )
  },[])

  return (
    <>
      we are live
    </>
  );
}

export default App;
