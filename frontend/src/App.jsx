import Home from "../pages/Home";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <>
      <AppContextProvider>
        <Home />
      </AppContextProvider>
    </>
  );
}

export default App;
