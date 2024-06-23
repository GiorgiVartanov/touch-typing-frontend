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

export const convertFromCurrentLayoutToPythonApi = (characterPlacement: KeyInterface[]) => {
  let pythonApiLayout: {
    character: string
    button_id: number | null
  }[] = []
  let index = 1
  let dummy_count = 1
  characterPlacement.slice(1).forEach((value) => {
    if (value.fixed != undefined) {
      let cur_val_0 = value.value[0] ? value.value[0] : "dummy_character_" + String(dummy_count++)
      if (value.fixed[0]) {
        pythonApiLayout.push({ character: cur_val_0, button_id: index })
      } else pythonApiLayout.push({ character: cur_val_0, button_id: null })

      ++index
    }
  })
  pythonApiLayout.push({ character: "`", button_id: 46 })
  pythonApiLayout.push({ character: " ", button_id: 47 })
  index += 2
  characterPlacement.slice(1).forEach((value) => {
    if (value.fixed != undefined) {
      let cur_val_1 = value.value[1] ? value.value[1] : "dummy_character_" + String(dummy_count++)
      if (value.fixed[1]) {
        pythonApiLayout.push({ character: cur_val_1, button_id: index })
      } else pythonApiLayout.push({ character: cur_val_1, button_id: null })

      ++index
    }
  })
  pythonApiLayout.push({ character: "dummy_character_20", button_id: 94 })
  pythonApiLayout.push({ character: "~", button_id: 93 })
  console.log(pythonApiLayout)
  return pythonApiLayout
}
