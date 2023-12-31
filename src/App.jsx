import { useState } from "react";
import reactLogo from "./assets/react.svg";
import aleoLogo from "./assets/aleo.svg";
import "./App.css";
import helloworld_program from "../helloworld/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker.js";


const aleoWorker = AleoWorker();
function App() {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [diffMinutes, setDiffMinutes] = useState(0);

  const generateAccount = async () => {
    const key = await aleoWorker.getPrivateKey();
    setAccount(await key.to_string());
  };

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    // check when the uploaded file was last modified
    const lastModified = new Date(file.lastModified);
    const date1 = new Date();
    const diffTime = Math.abs(date1 - lastModified);
    // convert diffTime into minutes
    setDiffMinutes(Math.ceil(diffTime / (1000 * 60)));
    

    // check if the file was modified in the last 24 hours
    if (diffMinutes > 1440) {
      alert("File was not modified in the last 24 hours");
    }

    console.log(diffMinutes);
    // how can i access the metadata of the file?
  }

  async function execute() {
    setExecuting(true);
    console.log(diffMinutes.toString() + "u8");
    const result = await aleoWorker.localProgramExecution(
      helloworld_program,
      "main",
      ["5u32", useEffect(() => {diffMinutes},[diffMinutes]).toString() + "u8"],
    );
    setExecuting(false);

    alert(JSON.stringify(result));
  }

  async function deploy() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(helloworld_program);
      console.log("Transaction:")
      console.log("https://explorer.hamp.app/transaction?id=" + result)
      alert("Transaction ID: " + result);
    } catch (e) {
      console.log(e)
      alert("Error with deployment, please check console for details");
    }
    setDeploying(false);
  }

  return (
    <>
      <div className="card">
        <input type="file" onChange={handleFileUpload} />
        <p>
          <button disabled={executing} onClick={execute}>
            {executing
              ? `Executing...check console for details...`
              : `Execute fileAuth.aleo`}
          </button>
        </p>
        <p>
        </p>
      </div>

      {/* Advanced Section */}
      <div className="card">
        <p>
          <button disabled={deploying} onClick={deploy}>
            {deploying
              ? `Deploying...check console for details...`
              : `Deploy fileAuth.aleo`}
          </button>
        </p>
      </div>
    </>
  );
}

export default App;
