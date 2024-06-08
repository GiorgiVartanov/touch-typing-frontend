import { KeyInterface } from "../types/keyboard.types"

const checkIfKeyboardHasEmptyKeys = (keyboard: KeyInterface[]) => {
  return keyboard.some((key) => key.value[0] === "" && (key.value[1] === "" || !key.value[1]))
}

export default checkIfKeyboardHasEmptyKeys
