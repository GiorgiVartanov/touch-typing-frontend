import { createContext, useContext, useReducer, useEffect } from "react"

import {
  setSelectedFont,
  setAmountOfShownLines,
  setAlignText,
  setFontSize,
  setLineHeight,
  setLetterSpacing,
} from "../actions/typingSettingsActions"
import typingSettingsReducer from "../reducers/typingSettingsReducers"
import { typingSettingsInitialState } from "../initial/typingSettingsInitialState"
import { TyperFunctions } from "../initial/typingSettingsInitialState"
import {
  FontType,
  AmountOfShownLinesType,
  AlignTextType,
  FontSizeType,
  LineHeightType,
  LetterSpacingType,
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
  const [state, dispatch] = useReducer(typingSettingsReducer, typingSettingsInitialState)

  const { token, user } = useAuthStore()

  const typingSettingsOptions: TypingSettingsOptionsInterface = {
    fontOptions: ["sans", "serif"],
    amountOfShownLinesOptions: ["3", "4", "5", "6", "7"],
    alignTextOptions: ["left", "center", "right"],
    fontSizeOptions: ["Auto", "8", "9", "10", "11", "12", "14", "18", "24", "30", "36"],
    lineHeightOptions: ["Auto", "8", "9", "10", "11", "12", "14", "18", "24", "30", "36"],
    letterSpacingOptions: ["0", "1", "2", "3", "4", "5", "6"],
  }

  // this function is called in a useEffect bellow after user is updated (registered/logged in), it sets settings to the one on user object (I am not sure if its a best practice, I may change it latter)
  const setFetchedSettings = () => {
    if (!user || !token) return

    const savedTypingSettings = user.typingSettings

    changeSetting("selectedFont", savedTypingSettings.selectedFont as FontType, false)
    changeSetting(
      "amountOfShownLinesSetting",
      savedTypingSettings.amountOfShownLines as AmountOfShownLinesType,
      false
    )
    changeSetting("alignText", savedTypingSettings.alignText as AlignTextType, false)
    changeSetting("lineHeight", savedTypingSettings.lineHeight as LineHeightType, false)
    changeSetting("lineHeight", savedTypingSettings.lineHeight as LineHeightType, false)
    changeSetting("letterSpacing", savedTypingSettings.letterSpacing as LetterSpacingType, false)
  }

  const setDefaultSettings = () => {
    changeSetting("selectedFont", typingSettingsInitialState.selectedFont as FontType, false)
    changeSetting(
      "amountOfShownLinesSetting",
      typingSettingsInitialState.amountOfShownLines as AmountOfShownLinesType,
      false
    )
    changeSetting("alignText", typingSettingsInitialState.alignText as AlignTextType, false)
    changeSetting("lineHeight", typingSettingsInitialState.lineHeight as LineHeightType, false)
    changeSetting("lineHeight", typingSettingsInitialState.lineHeight as LineHeightType, false)
    changeSetting(
      "letterSpacing",
      typingSettingsInitialState.letterSpacing as LetterSpacingType,
      false
    )
  }

  const saveSettingToLocalstorage = (settingName: string, newValue: string | number | boolean) => {
    localStorage.setItem(settingName, newValue.toString())
  }

  const saveSettingOnServer = (settingName: string, newValue: string | number | boolean) => {
    if (!token) return

    try {
      saveTypingSetting(settingName, newValue, token)
    } catch (error) {
      console.log(error)
    }
  }

  const dispatchSetting = (settingName: string, newValue: string | number | boolean) => {
    switch (settingName) {
      case "selectedFont":
        dispatch(setSelectedFont(newValue as FontType))
        break
      case "amountOfShownLines":
        dispatch(setAmountOfShownLines(newValue as AmountOfShownLinesType))
        break
      case "alignText":
        dispatch(setAlignText(newValue as AlignTextType))
        break
      case "fontSize":
        dispatch(setFontSize(newValue as FontSizeType))
        break
      case "lineHeight":
        dispatch(setLineHeight(newValue as LineHeightType))
        break
      case "letterSpacing":
        dispatch(setLetterSpacing(newValue as LetterSpacingType))
        break
      default:
        break
    }
  }

  const changeSetting = (
    settingName: string,
    newValue: string | number | boolean,
    saveOnServer: boolean = true
  ) => {
    if (!newValue) return

    saveSettingToLocalstorage(settingName, newValue)
    dispatchSetting(settingName, newValue)

    if (!saveOnServer) return

    saveSettingOnServer(settingName, newValue)
  }

  useEffect(() => {
    if (user) setFetchedSettings()
    else setDefaultSettings()
  }, [user])

  const store = {
    ...state,
    typingSettingsOptions,
    setFetchedSettings,
    changeSetting,
  }

  return <TypingSettingsContext.Provider value={store}>{children}</TypingSettingsContext.Provider>
}

export default TypingSettingsProvider
