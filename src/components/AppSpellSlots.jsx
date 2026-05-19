import { useEffect, useState } from "react";
export default function AppSpellSlots() {
  const [spellSlots, setSpellSlots] = useState({
    level: "",
    classe: "",
  });
  const [abilityBonus, setAbilityBonus] = useState({
    level: 0,
    ability_score_bonuses: 0,
    prof_bonus: 0,

    features: [],

    spellcasting: {
      cantrips_known: 0,
      spell_slots_level_1: 0,
      spell_slots_level_2: 0,
      spell_slots_level_3: 0,
      spell_slots_level_4: 0,
      spell_slots_level_5: 0,
      spell_slots_level_6: 0,
      spell_slots_level_7: 0,
      spell_slots_level_8: 0,
      spell_slots_level_9: 0,
    },

    class_specific: {
      wild_shape_max_cr: 0,
      wild_shape_swim: false,
      wild_shape_fly: false,
    },

    index: "",

    class: {
      index: "",
      name: "",
      url: "",
    },

    url: "",
    updated_at: "",
  });

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
      .then((response) => response.json())
      .then((result) => {
        setAbilityBonus(result);
      });
  }, [spellSlots]);

  return (
    <div>
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
        <option value="barbarian">Barbarian</option>
        <option value="bard">Bard</option>
        <option value="cleric">Cleric</option>
        <option value="druid">Druid</option>
        <option value="fighter">Fighter</option>
        <option value="monk">Monk</option>
        <option value="paladin">Paladin</option>
        <option value="ranger">Ranger</option>
        <option value="rogue">Rogue</option>
        <option value="sorcerer">Sorcerer</option>
        <option value="warlock">Warlock</option>
        <option value="wizard">Wizard</option>
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

      <ul></ul>
      <div className="card mt-3">
        <div className="card-body">
          {/* HEADER */}
          <h3 className="card-title">
            {abilityBonus.class?.name} - Level {abilityBonus.level}
          </h3>

          <h6 className="card-subtitle mb-3 text-muted">
            Index: {abilityBonus.index}
          </h6>

          {/* BONUS BASE */}
          <div className="mb-3">
            <p className="mb-1">
              <strong>Proficiency Bonus:</strong> {abilityBonus.prof_bonus}
            </p>

            <p className="mb-1">
              <strong>Ability Score Bonuses:</strong>{" "}
              {abilityBonus.ability_score_bonuses}
            </p>
          </div>

          {/* FEATURES */}
          {abilityBonus.features?.length > 0 && (
            <div className="mb-3">
              <h5>Features</h5>

              <ul className="list-group">
                {abilityBonus.features.map((feature) => (
                  <li
                    key={feature.index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {feature.name}

                    {/* Bottone cliccabile solo se esiste url */}
                    {feature.url && (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => console.log(feature.url)}
                      >
                        Details
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SPELLCASTING */}
          {abilityBonus.spellcasting && (
            <div className="mb-3">
              <h5>Spellcasting</h5>

              <ul className="list-group">
                {Object.entries(abilityBonus.spellcasting).map(
                  ([key, value]) => (
                    <li
                      key={key}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{key.replaceAll("_", " ")}</span>
                      <span>{value}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {/* CLASS SPECIFIC */}
          {abilityBonus.class_specific && (
            <div className="mb-3">
              <h5>Class Specific</h5>

              <ul className="list-group">
                {Object.entries(abilityBonus.class_specific).map(
                  ([key, value]) => (
                    <li
                      key={key}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{key.replaceAll("_", " ")}</span>
                      <span>{String(value)}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {/* UPDATED */}
          {abilityBonus.updated_at && (
            <p className="text-muted mt-3">
              Updated: {new Date(abilityBonus.updated_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
