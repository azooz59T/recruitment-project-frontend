import { useContext, useState } from 'react';
import './navbar.scss';
import {Link} from "react-router-dom";
import {Menu, LightMode, DarkMode} from "@mui/icons-material";
import { ToggleButton } from '@mui/material';
import { ThemeContext } from '../context/theme.context';

const links = [
    {href: '/', label:"Home"},
    {href: '/companies', label:"Companies"},
    {href: '/jobs', label:"Jobs"},
    {href: '/candidates', label:"Candidates"},
]
const Navbar = () => {
    const {darkMode, toggleDarkMode} = useContext(ThemeContext);
    const [open, setOpen] = useState<boolean>(false);

    const ToggleHamburgerMenu = () => {
        setOpen((prevState => !prevState));
    }

    const menuStyles = open ? "menu open" : "menu";

  return (
    <div className="navbar">
        <div className="brand">
            <span>Resume Management</span>
        </div>
        <div className={menuStyles}>
            <ul>
                {links.map((item) => (
                    <li key={item.href} onClick={ToggleHamburgerMenu}>
                        <Link to={item.href}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
        <div className="hamburger">
            <Menu onClick={ToggleHamburgerMenu}/>
        </div>
        <div className="toggle">
            <ToggleButton value="phone" selected={darkMode} onChange={toggleDarkMode}>
                {darkMode ? <LightMode /> : <DarkMode />}
            </ToggleButton>
        </div>
    </div>
  )
}

export default Navbar