import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
