import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SpellList from "./pages/SpellList";
import DefaultLayout from "./assets/DefaultLayout";
import Slots from "./pages/Slots";
import Spell from "./pages/Spell";

function App() {
  


 
  
  
  return (
    <>
      
               
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" element={<HomePage />} />
            <Route path="/spelllist" element={<SpellList />} />
            <Route path="/spell/:id" element={<Spell />} />
            <Route path="/slots" element={<Slots />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
