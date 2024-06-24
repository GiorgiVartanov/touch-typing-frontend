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

  const georgianLetters = [
    "ა",
    "ბ",
    "გ",
    "დ",
    "ე",
    "ვ",
    "ზ",
    "თ",
    "ი",
    "კ",
    "ლ",
    "მ",
    "ნ",
    "ო",
    "პ",
    "ჟ",
    "რ",
    "ს",
    "ტ",
    "უ",
    "ფ",
    "ქ",
    "ღ",
    "ყ",
    "შ",
    "ჩ",
    "ც",
    "ძ",
    "წ",
    "ჭ",
    "ხ",
    "ჯ",
    "ჰ",
  ]

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
  ]
  let index_oh_index = 0
  georgianLetters.forEach((letter) => {
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

const convertFromCurrentLayoutToPythonApi3 = (characterPlacement: KeyInterface[]) => {
  let pythonApiLayout: {
    character: string
    button_id: number | null
  }[] = []
  let index = 1
  let dummy_count = 1
  const fixed_letters: string[] = []
  const fixed_letters_index = []
  const fixed_punctuation: string[] = []
  const fixed_punctuation_index = []
  const fixed_digits: string[] = []
  const fixed_digits_index = []

  characterPlacement.slice(1).forEach((value) => {
    if (value.type == "Letter") {
      if (value.value[0]) {
        fixed_letters.push(value.value[0])
        fixed_letters_index.push([value.value[0], index])
      }
      if (value.value[1]) {
        fixed_letters.push(value.value[1])
        fixed_letters_index.push([value.value[1], index + 47])
      }
      ++index
    }
    if (value.type == "Symbol" && value.code != "Backslash" && value.code != "Backquote") {
      if (value.value[0]) {
        fixed_punctuation.push(value.value[0])
        fixed_punctuation_index.push([value.value[0], index])
      }
      if (value.value[1]) {
        fixed_punctuation.push(value.value[1])
        fixed_punctuation_index.push([value.value[1], index + 47])
      }
      ++index
    }
    if (value.type == "Digit") {
      if (value.value[0]) {
        fixed_digits.push(value.value[0])
        fixed_digits_index.push([value.value[0], index])
      }
      if (value.value[1]) {
        fixed_digits.push(value.value[1])
        fixed_digits_index.push([value.value[1], index + 47])
      }
      ++index
    }
  })

  pythonApiLayout.push({ character: "`", button_id: 46 })
  pythonApiLayout.push({ character: " ", button_id: 47 })

  pythonApiLayout.push({ character: "dummy_character_20", button_id: 94 })
  pythonApiLayout.push({ character: "~", button_id: 93 })
  // console.log(pythonApiLayout)
  return pythonApiLayout
}

const convertFromCurrentLayoutToPythonApi2 = (characterPlacement: KeyInterface[]) => {
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
  // console.log(pythonApiLayout)
  return pythonApiLayout
}
