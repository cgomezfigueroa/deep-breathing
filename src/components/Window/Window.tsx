import { Circle } from "../Circle/Circle"
import { PaceInput } from "../PaceInput/PaceInput"
import { TimeSelector } from "../TimeSelector/TimeSelector"
import { Header, MainArea, WindowContainer } from "./Window.styles"
import { ThemeToggle } from "../ThemeToggle/ThemeToggle"
import { createContext, useEffect, useState } from "react"
import { Background } from "../Background/Background"
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../../theme"

interface MainContextProps {
    pace: number | null
    setPace: React.Dispatch<React.SetStateAction<number | null>>
    theme: string
    setTheme: React.Dispatch<React.SetStateAction<string>>
    time: number | null
    setTime: React.Dispatch<React.SetStateAction<number | null>>
    initTime: number | null
    setInitTime: React.Dispatch<React.SetStateAction<number | null>>
    breathing: boolean
    setBreathing: React.Dispatch<React.SetStateAction<boolean>>
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const MainContext = createContext({} as MainContextProps)

export const Window = () =>{
    const [pace, setPace] = useState<number | null>(null)
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const [time, setTime] = useState<number | null>(null)
    const [initTime, setInitTime] = useState<number | null>(null)
    const [breathing, setBreathing] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const styledTheme = theme === "dark" ? darkTheme : lightTheme;

    useEffect(() => {
        console.log(theme);
    }, [theme]);

    return (
        <MainContext.Provider value={{ pace, setPace, theme, setTheme, time, setTime, initTime, setInitTime, breathing, setBreathing, darkMode, setDarkMode }}>
            <ThemeProvider theme={styledTheme}>
                <WindowContainer>
                    <Background>
                        <Header>
                            <PaceInput />
                            <ThemeToggle />
                        </Header>
                        {!breathing ? <TimeSelector /> : ''}
                        <MainArea>
                            <Circle />
                        </MainArea>
                    </Background>
                </WindowContainer>
            </ThemeProvider>
        </MainContext.Provider>
    )
}