import { RecoilRoot } from 'recoil';

import Routes from "./routes";
import DebugObserver from "./components/DebugObserver";
import { initRecoilState } from "./recoil/utils";

import './App.css'

function App() {
  return (
    <RecoilRoot initializeState={initRecoilState}>
      <DebugObserver />
      <Routes />
    </RecoilRoot>
    );
}

export default App;
