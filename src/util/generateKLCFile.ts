type Language = "Geo" | "Eng"

interface KeyboardKey {
  code: string
  value: string[] | string
  type: string
}

interface KeyboardLayout {
  _id: string
  language: string
  title: string
  public: boolean
  official: boolean
  keyboard: KeyboardKey[]
}

// helper function to map key code to the required SC and VK_ values
const keyCodeMap: { [key: string]: string } = {
  Backquote: "29",
  Digit1: "02",
  Digit2: "03",
  Digit3: "04",
  Digit4: "05",
  Digit5: "06",
  Digit6: "07",
  Digit7: "08",
  Digit8: "09",
  Digit9: "0a",
  Digit0: "0b",
  Minus: "0c",
  Equal: "0d",
  KeyQ: "10",
  KeyW: "11",
  KeyE: "12",
  KeyR: "13",
  KeyT: "14",
  KeyY: "15",
  KeyU: "16",
  KeyI: "17",
  KeyO: "18",
  KeyP: "19",
  BracketLeft: "1a",
  BracketRight: "1b",
  Backslash: "2b",
  KeyA: "1e",
  KeyS: "1f",
  KeyD: "20",
  KeyF: "21",
  KeyG: "22",
  KeyH: "23",
  KeyJ: "24",
  KeyK: "25",
  KeyL: "26",
  Semicolon: "27",
  Quote: "28",
  KeyZ: "2c",
  KeyX: "2d",
  KeyC: "2e",
  KeyV: "2f",
  KeyB: "30",
  KeyN: "31",
  KeyM: "32",
  Comma: "33",
  Period: "34",
  Slash: "35",
  Space: "39",
  Backspace: "0e",
  Tab: "0f",
  CapsLock: "3a",
  Enter: "1c",
  ShiftLeft: "2a",
  ShiftRight: "36",
  ControlLeft: "1d",
  ControlRight: "1d",
  MetaLeft: "5b",
  MetaRight: "5c",
  AltLeft: "38",
  AltRight: "38",
  ContextMenu: "5d",
  Decimal: "53",
  OEM_1: "27",
  OEM_2: "35",
  OEM_3: "29",
  OEM_4: "1a",
  OEM_5: "56",
  OEM_6: "1b",
  OEM_7: "28",
  OEM_8: "2b",
  OEM_PLUS: "0d",
  OEM_MINUS: "0c",
  OEM_COMMA: "33",
  OEM_PERIOD: "34",
}

const keyMap = {
  Backquote: "OEM_3",
  Digit1: "DIGIT ONE",
  Digit2: "DIGIT TWO",
  Digit3: "DIGIT THREE",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "OEM_MINUS",
  Equal: "OEM_PLUS",
  Backspace: "BACKSPACE",
  Tab: "TAB",
  ქ: "GEORGIAN LETTER KHAR",
  წ: "GEORGIAN LETTER CIL",
  ჭ: "GEORGIAN LETTER CHAR",
  რ: "GEORGIAN LETTER RAE",
  ტ: "GEORGIAN LETTER TAR",
  თ: "GEORGIAN LETTER TAN",
  ყ: "GEORGIAN LETTER QAR",
  უ: "GEORGIAN LETTER UN",
  ი: "GEORGIAN LETTER IN",
  ო: "GEORGIAN LETTER ON",
  პ: "GEORGIAN LETTER PAR",
  BracketLeft: "OEM_4",
  BracketRight: "OEM_6",
  Backslash: "OEM_5",
  CapsLock: "CAPSLOCK",
  ა: "GEORGIAN LETTER AN",
  ს: "GEORGIAN LETTER SAN",
  შ: "GEORGIAN LETTER SHIN",
  დ: "GEORGIAN LETTER DON",
  ფ: "GEORGIAN LETTER PHAR",
  გ: "GEORGIAN LETTER GAN",
  ჰ: "GEORGIAN LETTER HAE",
  ჯ: "GEORGIAN LETTER JHAN",
  ჟ: "GEORGIAN LETTER ZHAR",
  კ: "GEORGIAN LETTER KAN",
  ლ: "GEORGIAN LETTER LAS",
  Semicolon: "OEM_1",
  Quote: "OEM_7",
  Enter: "ENTER",
  ShiftLeft: "LSHIFT",
  ზ: "GEORGIAN LETTER ZEN",
  ძ: "GEORGIAN LETTER ZHAR",
  ხ: "GEORGIAN LETTER KHAR",
  ც: "GEORGIAN LETTER CAN",
  ჩ: "GEORGIAN LETTER CHIN",
  ვ: "GEORGIAN LETTER VIN",
  ბ: "GEORGIAN LETTER BAN",
  ნ: "GEORGIAN LETTER NAR",
  მ: "GEORGIAN LETTER MAN",
  Comma: "OEM_COMMA",
  Period: "OEM_PERIOD",
  Slash: "OEM_2",
  ShiftRight: "RSHIFT",
  ControlLeft: "LCTRL",
  MetaLeft: "LWIN",
  AltLeft: "LALT",
  Space: "SPACE",
  AltRight: "RALT",
  MetaRight: "RWIN",
  ContextMenu: "APPS",
  ControlRight: "RCTRL",
}

export const transformKeyboardLayout = (layout: KeyboardLayout): string => {
  // builds the .klc file content

  const date = new Date()

  let klcContent = `
KBD\t"${layout.title}"

COPYRIGHT\t"(c) ${date.getFullYear()} Company (not really :/)"

COMPANY\t"Company"

LOCALENAME\t"ka-GE"

LOCALEID\t""00000437"

VERSION\t1.0

SHIFTSTATE

0\t//Column 4
1\t//Column 5 : Shft
2\t//Column 6 :       Ctrl
6\t//Column 7 :       Ctrl Alt
7\t//Column 8 : Shft  Ctrl Alt

LAYOUT\t\t;an extra '@' at the end is a dead key

//SC\tVK_\t\tCap\t0\t1\t2\t6
//--\t----\t\t----\t----\t----\t----\t----\t----
`

  // adds keyboard layout details
  layout.keyboard.forEach((key) => {
    const sc = keyCodeMap[key.code]
    if (sc) {
      const vk = key.code.toUpperCase().replace(/KEY|DIGIT|OEM|QUOTE|SEMICOLON/, "")
      const value0 =
        typeof key.value === "string" ? key.value : key.value[0].charCodeAt(0).toString(16)
      const value1 =
        typeof key.value === "string"
          ? "-1"
          : key.value[1]
            ? key.value[1].charCodeAt(0).toString(16)
            : "-1"
      klcContent += `${sc}\t${vk}\t\t0\t${value0}\t${value1}\t-1\t-1\t-1\t\t// ${key.type.toUpperCase()}\n`
    }
  })

  // adds fixed content
  klcContent += `
KEYNAME

01\tEsc
0e\tBackspace
0f\tTab
1c\tEnter
1d\tCtrl
2a\tShift
36\t"Right Shift"
37\t"Num *"
38\tAlt
39\tSpace
3a\t"Caps Lock"
3b\tF1
3c\tF2
3d\tF3
3e\tF4
3f\tF5
40\tF6
41\tF7
42\tF8
43\tF9
44\tF10
45\tPause
46\t"Scroll Lock"
47\t"Num 7"
48\t"Num 8"
49\t"Num 9"
4a\t"Num -"
4b\t"Num 4"
4c\t"Num 5"
4d\t"Num 6"
4e\t"Num +"
4f\t"Num 1"
50\t"Num 2"
51\t"Num 3"
52\t"Num 0"
53\t"Num Del"
54\t"Sys Req"
57\tF11
58\tF12
7c\tF13
7d\tF14
7e\tF15
7f\tF16
80\tF17
81\tF18
82\tF19
83\tF20
84\tF21
85\tF22
86\tF23
87\tF24

KEYNAME_EXT

1c\t"Num Enter"
1d\t"Right Ctrl"
35\t"Num /"
37\t"Prnt Scrn"
38\t"Right Alt"
45\t"Num Lock"
46\tBreak
47\tHome
48\tUp
49\t"Page Up"
4b\tLeft
4d\tRight
4f\tEnd
50\tDown
51\t"Page Down"
52\tInsert
53\tDelete
54\t<00>
56\tHelp
5b\t"Left Windows"
5c\t"Right Windows"
5d\tApplication

DESCRIPTIONS

0409\tGeorgian\t(${layout.title})\t - the-touch-typing.netlify.app
LANGUAGENAMES

0409\tGeorgian\t(Georgia)
ENDKBD
`

  return klcContent
}

export const downloadKLCFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)
}
