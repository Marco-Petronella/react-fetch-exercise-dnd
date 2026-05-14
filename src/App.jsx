import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function App() {
  const [spellSlots, setSpellSlots] = useState({
    level: "",
    classe: "",   
  });
    const [spellsList, setSpellsList] = useState({
    level: "",
    school: "",   
  });
    const [spellsListFetched, setSpellsListFetched] = useState([]);

  useEffect(() => {
    console.log(spellSlots.classe + " && " + spellSlots.level);

    if (!spellSlots.classe || !spellSlots.level) return;
    console.log("hai selezionato " + spellSlots.classe);
    fetch(
      "https://www.dnd5eapi.co/api/2014/classes/" +
        spellSlots.classe +
        "/levels/" +
        spellSlots.level,
    )
      .then((response) => response.text())
      .then((result) => console.log(result));
  }, [spellSlots]);
  
  useEffect(() => {
    console.log(spellsList.school + " && " + spellsList.level);

    if (!spellsList.school || !spellsList.level) return;
    console.log("hai selezionato " + spellsList.school);
    fetch(
      "https://www.dnd5eapi.co/api/2014/spells/?level=" +
        spellsList.level +
        "&school=" +
        spellsList.school,
    )
      .then((response) => response.json())
      .then((result) => {
      console.log(result);
      setSpellsListFetched(result.results);
      console.log(spellsListFetched);
    })
  }, [spellsList]);
  return (
    <>
      <div className="m-2">ciao</div>
      <select
        name="classe"
        onChange={(e) => {
          setSpellSlots({
            ...spellSlots,
            classe: e.target.value,
          });
        }}
      >
        <option value=""></option>
        <option value="druid">druid</option>
        <option value="sorcerer">sorcerer</option>
        <option value="wizard">wizard</option>
      </select>
      <select
        name="level"
        onChange={(e) => {
          setSpellSlots({
            ...spellSlots,
            level: e.target.value,
          });
        }}
      >
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
      <br />
       <select
        name="classe"
        onChange={(e) => {
          setSpellsList({
            ...spellsList,
            school: e.target.value,
          });
        }}
      >
        <option value=""></option>
        <option value="illusion">illusion</option>
        <option value="evocation">evocation</option>
        <option value="all">all</option>
      </select>
      <select
        name="level"
        onChange={(e) => {
          setSpellsList({
            ...spellsList,
            level: e.target.value,
          });
        }}
      >
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
      <br />
      <ul>
       {spellsListFetched?.map((element) => (<li key={element.index}>{element.name}</li>))}
      </ul> 
    </>
  );
}

export default App;
