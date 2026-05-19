import { useEffect, useState } from "react";

export default function AppSpellList() {
  const [spellsList, setSpellsList] = useState({
    level: "",
    school: "",
    classe: "",
  });

  const [spellsListFetched, setSpellsListFetched] = useState([]);

  const [selectedSpell, setSelectedSpell] = useState(null);

  // FETCH LISTA SPELL
  useEffect(() => {
    if (!spellsList.school || !spellsList.level) return;

    let url =
      "https://www.dnd5eapi.co/api/2014/spells/?level=" +
      spellsList.level;

    // se non è "all" aggiunge la school
    if (spellsList.school !== "all") {
      url += "&school=" + spellsList.school;
    }

    // se è stata scelta una classe
    if (spellsList.classe) {
      url += "&class=" + spellsList.classe;
    }

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSpellsListFetched(result.results);
      });
  }, [spellsList]);

  // FETCH SINGOLA SPELL
  function fetchSpellDetails(url) {
    fetch("https://www.dnd5eapi.co" + url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSelectedSpell(result);
      });
  }

  return (
    <div className="container mt-4">

      {/* FILTRI */}
      <div className="d-flex gap-2 mb-4">

        {/* SCHOOL */}
        <select
          className="form-select"
          name="school"
          onChange={(e) => {
            setSpellsList({
              ...spellsList,
              school: e.target.value,
            });
          }}
        >
          <option value="">Select School</option>

          <option value="abjuration">Abjuration</option>
          <option value="conjuration">Conjuration</option>
          <option value="divination">Divination</option>
          <option value="enchantment">Enchantment</option>
          <option value="evocation">Evocation</option>
          <option value="illusion">Illusion</option>
          <option value="necromancy">Necromancy</option>
          <option value="transmutation">Transmutation</option>

          <option value="all">All Schools</option>
        </select>

        {/* LEVEL */}
        <select
          className="form-select"
          name="level"
          onChange={(e) => {
            setSpellsList({
              ...spellsList,
              level: e.target.value,
            });
          }}
        >
          <option value="">Spell Level</option>

          <option value="0">Cantrip</option>
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

        {/* CLASSI CASTERS */}
        <select
          className="form-select"
          name="classe"
          onChange={(e) => {
            setSpellsList({
              ...spellsList,
              classe: e.target.value,
            });
          }}
        >
          <option value="">All Classes</option>

          <option value="bard">Bard</option>
          <option value="cleric">Cleric</option>
          <option value="druid">Druid</option>
          <option value="paladin">Paladin</option>
          <option value="ranger">Ranger</option>
          <option value="sorcerer">Sorcerer</option>
          <option value="warlock">Warlock</option>
          <option value="wizard">Wizard</option>
          <option value="artificer">Artificer</option>
        </select>
      </div>

      {/* LISTA SPELL */}
      <div className="row">

        {/* COLONNA LISTA */}
        <div className="col-md-4">
          <ul className="list-group">

            {spellsListFetched?.map((element) => (
              <li
                key={element.index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{element.name}</strong>
                  <br />
                  <small>Level {element.level}</small>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => fetchSpellDetails(element.url)}
                >
                  Show Spell
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* COLONNA CARD SPELL */}
        <div className="col-md-8">

          {selectedSpell && (
            <div className="card">
              <div className="card-body">

                <h2 className="card-title">
                  {selectedSpell.name}
                </h2>

                <h5 className="text-muted mb-3">
                  {selectedSpell.school?.name} - Level {selectedSpell.level}
                </h5>

                {/* DESCRIZIONE */}
                <div className="mb-3">
                  <h5>Description</h5>

                  {selectedSpell.desc?.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* HIGHER LEVEL */}
                {selectedSpell.higher_level?.length > 0 && (
                  <div className="mb-3">
                    <h5>Higher Level</h5>

                    {selectedSpell.higher_level.map((text, index) => (
                      <p key={index}>{text}</p>
                    ))}
                  </div>
                )}

                {/* INFO RAPIDE */}
                <div className="mb-3">
                  <p>
                    <strong>Range:</strong> {selectedSpell.range}
                  </p>

                  <p>
                    <strong>Duration:</strong> {selectedSpell.duration}
                  </p>

                  <p>
                    <strong>Casting Time:</strong>{" "}
                    {selectedSpell.casting_time}
                  </p>

                  <p>
                    <strong>Concentration:</strong>{" "}
                    {selectedSpell.concentration ? "Yes" : "No"}
                  </p>

                  <p>
                    <strong>Ritual:</strong>{" "}
                    {selectedSpell.ritual ? "Yes" : "No"}
                  </p>
                </div>

                {/* COMPONENTS */}
                <div className="mb-3">
                  <h5>Components</h5>

                  <div className="d-flex gap-2">
                    {selectedSpell.components?.map((component) => (
                      <span
                        key={component}
                        className="badge text-bg-secondary"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CLASSI */}
                <div className="mb-3">
                  <h5>Classes</h5>

                  <ul className="list-group">
                    {selectedSpell.classes?.map((classe) => (
                      <li
                        key={classe.index}
                        className="list-group-item"
                      >
                        {classe.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SUBCLASSES */}
                {selectedSpell.subclasses?.length > 0 && (
                  <div className="mb-3">
                    <h5>Subclasses</h5>

                    <ul className="list-group">
                      {selectedSpell.subclasses.map((subclass) => (
                        <li
                          key={subclass.index}
                          className="list-group-item"
                        >
                          {subclass.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}