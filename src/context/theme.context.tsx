import React, { createContext, useState} from "react";

interface IthemeContextInterface {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IthemeContextInterface>({
    darkMode: false,
    toggleDarkMode: () => {},
})

interface IthemeContextProviderProps {
    children: React.ReactNode
}

const ThemeContextProvider = ({ children }: IthemeContextProviderProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const toggleDarkMode: () => void = () => {
        setDarkMode((prevState) => !prevState);
    };

    return <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider;
