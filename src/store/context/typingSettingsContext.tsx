import { createContext, useContext, useReducer } from "react"

import {
  setSelectedFont,
  setAmountOfShownLines,
  setAlignText,
  setFontSize,
  setLineSpacing,
  setLetterSpacing,
} from "../actions/typingSettingsActions"
import typingSettingsReducer from "../reducers/typingSettingsReducers"
import { initialState } from "../initial/typingSettingsInitialState"
import { TyperFunctions } from "../initial/typingSettingsInitialState"
import {
  FontType,
  TextAlignType,
  TypingSettingsOptionsInterface,
} from "../../types/typingSettings.types"
import { TypingSettingsInterface } from "../../types/typingSettings.types"
import { saveTypingSetting } from "../../services/typingSettingsServices"
import { useAuthStore } from "./authContext"
// import { AxiosError } from "axios"

interface TypingSettingsListInterface {
  typingSettingsOptions: TypingSettingsOptionsInterface
}

interface ContextInterface
  extends TypingSettingsInterface,
    TyperFunctions,
    TypingSettingsListInterface {}

const TypingSettingsContext = createContext<ContextInterface>({} as ContextInterface)

// interface AxiosErrorResponse extends AxiosError {
//   message: string
// }

export const useTypingSettingsStore = () => useContext(TypingSettingsContext)

interface Props {
  children: React.ReactNode
}

const TypingSettingsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(typingSettingsReducer, initialState)

  const { token } = useAuthStore()

  const typingSettingsOptions: TypingSettingsOptionsInterface = {
    fontOptions: ["sans", "serif"],
    amountOfShownLinesOptions: [3, 4, 5, 6],
    alignTextOptions: ["Left", "Center", "Right"],
    fontSizeOptions: [1, 1.25, 1.5, 1.75, 2],
    lineSpacingOptions: [1, 1.25, 1.5, 1.75, 2],
    letterSpacingOptions: [0, 0.25, 0.5, 0.75, 1],
  }

  const setFetchedSettings = (settings: TypingSettingsInterface) => {
    console.log(settings)
  }

  const saveSetting = (settingName: string, value: string | number) => {
    localStorage.setItem(settingName, value.toString())

    if (!token) return

    try {
      saveTypingSetting(settingName, value, token)
    } catch (error) {
      console.log(error)
    }
  }

  const changeSetting = (settingName: string, newValue: string | number) => {
    saveSetting(settingName, newValue)

    switch (settingName) {
      case "selectedFont":
        dispatch(setSelectedFont(newValue as FontType))
        break
      case "amountOfShownLines":
        dispatch(setAmountOfShownLines(newValue as number))
        break
      case "alignText":
        dispatch(setAlignText(newValue as TextAlignType))
        break
      case "fontSize":
        dispatch(setFontSize(newValue as number))
        break
      case "lineSpacing":
        dispatch(setLineSpacing(newValue as number))
        break
      case "letterSpacing":
        dispatch(setLetterSpacing(newValue as number))
        break
      default:
        break
    }
  }

  const store = {
    ...state,
    typingSettingsOptions,
    setFetchedSettings,
    changeSetting,
  }

  return <TypingSettingsContext.Provider value={store}>{children}</TypingSettingsContext.Provider>
}

export default TypingSettingsProvider
