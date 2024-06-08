import { KeyInterface } from "../types/keyboard.types"
import { defaultKeyboardLayout } from "../store/initial/typingSettingsInitialState"
import { Character } from "../types/optimization.types"

export const convertFromPythonApiLayoutToCurrent = (
  characterPlacement: Character[]
): KeyInterface[] => {
  const choose_type = (str: string) => {
    const georgianAlphabet = "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ"
    if (georgianAlphabet.includes(str)) return "Letter"
    else return "Symbol"
  }
  let newPlacement = structuredClone(defaultKeyboardLayout.Geo.keyboard)
  characterPlacement = characterPlacement.map((key) =>
    key.character.length > 1 ? { character: "", button_id: key.button_id } : key
  )
  for (let i = 0; i < 12; i++) {
    newPlacement[i + 1].value = [
      characterPlacement[i].character,
      characterPlacement[i + 47].character,
    ]
    newPlacement[i + 1].type = choose_type(characterPlacement[i].character)
    newPlacement[i + 15].value = [
      characterPlacement[i + 12].character,
      characterPlacement[i + 12 + 47].character,
    ]
    newPlacement[i + 15].type = choose_type(characterPlacement[i + 12].character)

    if (i < 11) {
      newPlacement[i + 29].value = [
        characterPlacement[i + 24].character,
        characterPlacement[i + 24 + 47].character, //35
      ]
      newPlacement[i + 29].type = choose_type(characterPlacement[i + 24].character)
    }
    if (i < 10) {
      newPlacement[i + 42].value = [
        characterPlacement[i + 35].character,
        characterPlacement[i + 35 + 47].character, //35
      ]
      newPlacement[i + 42].type = choose_type(characterPlacement[i + 35].character)
    }
  }
  newPlacement[0].value = [characterPlacement[45].character, characterPlacement[45 + 47].character]
  return newPlacement
}

export const convertFromCurrentLayoutToPythonApi = (characterPlacement: KeyInterface[]) => {}
