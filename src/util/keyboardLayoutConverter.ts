import { KeyInterface } from "../types/keyboard.types"
import { defaultKeyboardLayout } from "../store/initial/typingSettingsInitialState"
import { Character } from "../types/optimization.types"
import georgian_letters from "../letters/georgian.json"

export const convertFromPythonApiLayoutToCurrent = (
  characterPlacement: Character[]
): KeyInterface[] => {
  console.log("convertFromPythonApiLayoutToCurrent: ", characterPlacement)
  const choose_type = (str: string) => {
    if (georgian_letters.includes(str)) return "Letter"
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

export const convertFromCurrentLayoutToPythonApi = (
  characterPlacement: KeyInterface[],
  punctuation_placement: number[]
) => {
  let pythonApiLayout: {
    character: string
    button_id: number | null
  }[] = []
  let index = 0
  let dummy_count = 1
  punctuation_placement = punctuation_placement.sort()
  console.log(punctuation_placement)
  //წინასწარ შევქმნა 94-ელემენტიანი მასივი, ცარიელი, ან საჭირო ველებით.
  //შევავსო მერე.
  //ბოლოს დავიარო და ვნახო რა ასოებია გამორჩენილი და ჩავსვა ნებისმიერ თავისუფალ ადგილას.
  //ბოლოს შევავსო ყველაფერი dummy-თი.

  let array: { character: string; button_id: number | null }[] = Array.from({ length: 94 }, () => ({
    character: "",
    button_id: null,
  }))

  characterPlacement.slice(1).forEach((value) => {
    if (["Letter", "Digit", "Symbol"].includes(value.type)) {
      if (!["Backslash", "Backquote"].includes(value.code)) {
        if (value.value[0]) {
          array[index].character = value.value[0]
          array[index].button_id = index + 1
        }
        if (value.value[1]) {
          array[index + 47].character = value.value[1]
          array[index + 47].button_id = index + 48
        }
        ++index
      }
    }
  })

  array[45].button_id = 46
  array[45].character = "`"
  array[92].character = "~"
  array[92].button_id = 93
  array[93].button_id = 94
  array[93].character = "dummy_character_20"
  array[46].button_id = 47
  array[46].character = " "

  function checkGeorgianLetter(letter: string): boolean {
    for (let i = 0; i < array.length; i++) {
      if (array[i].character === letter) {
        return true
      }
    }
    return false
  }

  function checkPunctuation(letter: string): boolean {
    for (let i = 0; i < array.length; i++) {
      if (array[i].character === letter) {
        return true
      }
    }
    return false
  }

  let unused_indices = []
  for (let i = 0; i < array.length; ++i) {
    if (array[i].button_id) continue
    else {
      unused_indices.push(i)
    }
  }

  const punctuation = [
    ".",
    "'",
    ",",
    '"',
    "?",
    ":",
    ";",
    "[",
    "]",
    "{",
    "}",
    "-",
    "/",
    "<",
    ">",
    "_",
    "+",
    "=",
  ]
  let index_oh_index = 0
  georgian_letters.forEach((letter) => {
    if (checkGeorgianLetter(letter)) {
    } else {
      while (punctuation_placement.includes(unused_indices[index_oh_index])) index_oh_index++
      array[unused_indices[index_oh_index]].character = letter
      ++index_oh_index
    }
  })
  index_oh_index = 0
  punctuation.forEach((punct) => {
    if (checkPunctuation(punct)) {
    } else {
      while (array[punctuation_placement[index_oh_index]].character) index_oh_index++
      array[punctuation_placement[index_oh_index]].character = punct
      ++index_oh_index
    }
  })
  for (let i = 0; i < array.length; ++i)
    if (array[i].character) {
    } else {
      array[i].character = "dummy_character_" + String(dummy_count)
      dummy_count++
    }

  //console.log(array)
  return array
}

export const validateKeyboardLayout = (characterPlacement: KeyInterface[]): boolean => {
  const punctuation = "-_=+[]{};:'\",.<>/?"
  const reducedPlacement = characterPlacement.reduce((accumulator: String[], item) => {
    if (Array.isArray(item.value)) {
      accumulator.push(item.value[0])
      accumulator.push(item.value[1])
    }
    return accumulator
  }, [] as String[])
  for (const letter of georgian_letters) if (!reducedPlacement.includes(letter)) return false
  for (const punct of punctuation) if (!reducedPlacement.includes(punct)) return false
  return true
}

export const fixPunctuationPlacement = (
  characterPlacement: KeyInterface[],
  punctuation_indices: number[]
): KeyInterface[] => {
  const removed_punctuation: KeyInterface[] = characterPlacement.reduce(
    (accummulator: KeyInterface[], item) => {
      if (item.punct) {
        accummulator.push({
          ...item,
          punct: undefined,
        })
      } else {
        accummulator.push(item)
      }
      return accummulator
    },
    [] as KeyInterface[]
  )

  const fixed_punctuation: KeyInterface[] = removed_punctuation.reduce(
    (accumulator: KeyInterface[], item, index) => {
      if (punctuation_indices.includes(index)) {
        const tmp = item
        tmp.punct = true
        accumulator.push(tmp)
      } else {
        accumulator.push(item)
      }
      return accumulator
    },
    [] as KeyInterface[]
  )

  return fixed_punctuation
}

export const getPunctuationPlacementFromKeyboard = (
  characterPlacement: KeyInterface[]
): number[] => {
  const punctuation_placement: number[] = characterPlacement.reduce(
    (accumulator: number[], item, index) => {
      if (item.punct) {
        if (index < 13) {
          accumulator.push(index)
          accumulator.push(index + 47)
        } else if (index < 28) {
          accumulator.push(index - 2)
          accumulator.push(index - 2 + 47)
        } else if (index < 40) {
          accumulator.push(index - 4)
          accumulator.push(index - 4 + 47)
        } else {
          accumulator.push(index - 6)
          accumulator.push(index - 6 + 47)
        }
      }
      return accumulator
    },
    [] as number[]
  )
  return punctuation_placement
}

export const spaceProblem = (characterPlacement: KeyInterface[]): 0 | 1 | 2 => {
  const number_of_punctuation_keys = characterPlacement.reduce((accumulator: number, item) => {
    if (item.punct) {
      accumulator += 1
    }
    return accumulator
  }, 0)
  if (number_of_punctuation_keys < 9) {
    return 0
  }
  if (number_of_punctuation_keys > 18) {
    return 1
  }
  return 2
}
