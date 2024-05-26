import { KeyInterface } from "../types/keyboard.types"

const convertFromPythonApiLayoutToCurrent = (
  characterPlacement: string[],
  currentPlacement: KeyInterface[]
): KeyInterface[] => {
  const choose_type = (str: string) => {
    const georgianAlphabet = "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ"
    if (georgianAlphabet.includes(str)) return "Letter"
    else return "Symbol"
  }
  let newPlacement = structuredClone(currentPlacement)
  characterPlacement = characterPlacement.map((str) => (str.length > 1 ? "" : str))
  for (let i = 0; i < 12; i++) {
    newPlacement[i + 1].value = [characterPlacement[i], characterPlacement[i + 47]]
    newPlacement[i + 1].type = choose_type(characterPlacement[i])
    newPlacement[i + 15].value = [characterPlacement[i + 12], characterPlacement[i + 12 + 47]]
    newPlacement[i + 15].type = choose_type(characterPlacement[i + 12])

    if (i < 11) {
      newPlacement[i + 29].value = [
        characterPlacement[i + 24],
        characterPlacement[i + 24 + 47], //35
      ]
      newPlacement[i + 29].type = choose_type(characterPlacement[i + 24])
    }
    if (i < 10) {
      newPlacement[i + 42].value = [
        characterPlacement[i + 35],
        characterPlacement[i + 35 + 47], //35
      ]
      newPlacement[i + 42].type = choose_type(characterPlacement[i + 35])
    }
  }
  newPlacement[0].value = [characterPlacement[45], characterPlacement[45 + 47]]
  return newPlacement
}

export default convertFromPythonApiLayoutToCurrent
