import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AppRouter from "./Components/AppRouter";
import { Context } from "./index";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./Components/Loader";
import "./App.css";

const App = () => {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <div className="background">
        <Navbar />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
