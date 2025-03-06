import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { colors } from './theme';
import { typography } from './typography';

export const ThemeContext = React.createContext();

const ThemeProvider = ({ children }: any) => {
    const [isLightTheme, setLightTheme] = useState(false);
    const toggleTheme = () => setLightTheme(previousState => !previousState);
    const { theme } = useSelector((state: RootState) => state.theme);

    let selectedPalette: any = "";

    if (theme == "light") {
        selectedPalette = colors.light;
    }

    if (theme == "dark") {
        selectedPalette = colors.dark;
    }

    if (theme == "red") {
        selectedPalette = colors.red;
    }
    if (theme == "amaze") {
        selectedPalette = colors.amaze;
    }

    const theme1 = {
        colors: selectedPalette,
        typography,
        toggleTheme,
        isLightTheme,
    };

    return (
        <ThemeContext.Provider value={theme1}>{children}</ThemeContext.Provider>
    );
};

export const UserConsumer = ThemeContext.Consumer
export default ThemeProvider;
