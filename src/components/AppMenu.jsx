import { NavLink } from "react-router-dom";

export default function AppMenu () {
    const items = [
        {
            id: 1,
            name: "home",
            path: "/", 
        },
        {
            id: 2,
            name: "Elenco Spell",
            path: "/spelllist", 
        },
        {
            id: 3,
            name: "Slots per classe",
            path: "/slots", 
        }
    ]

    return (
        <>
        <nav className="container d-flex justify-content-between align-items-center">
        {items.map(item => (
            <li key={item.id}> <NavLink to={item.path}> {item.name}</NavLink></li>         
        ))}
        </nav>
        </>
    )
}
