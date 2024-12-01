import georgianLetters from "../letters/georgian.json"
import punctuation from "../letters/symbols.json"

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
  number: number
}

//you could add 10d0 the distance from letter x to letter 'ა', so 'ვ' = 10d0 + ('ვ' - 'ა') = 10d0 + 5 = 10d5, still let's save everything, this way we
//reduce calculations, but memory is used.
const keyMapDato = {
  ა: "10d0",
  ბ: "10d1",
  გ: "10d2",
  დ: "10d3",
  ე: "10d4",
  ვ: "10d5",
  ზ: "10d6",
  თ: "10d7",
  ი: "10d8",
  კ: "10d9",
  ლ: "10da",
  მ: "10db",
  ნ: "10dc",
  ო: "10dd",
  პ: "10de",
  ჟ: "10df",
  რ: "10e0",
  ს: "10e1",
  ტ: "10e2",
  უ: "10e3",
  ფ: "10e4",
  ქ: "10e5",
  ღ: "10e6",
  ყ: "10e7",
  შ: "10e8",
  ჩ: "10e9",
  ც: "10ea",
  ძ: "10eb",
  წ: "10ec",
  ჭ: "10ed",
  ხ: "10ee",
  ჯ: "10ef",
  ჰ: "10f0",
  "-": "002d",
  _: "005f",
  "=": "003d",
  "+": "002b",
  "[": "005b",
  "{": "007b",
  "]": "005d",
  "}": "007d",
  ";": "003b",
  ":": "003a",
  "'": "0027",
  '"': "0022",
  ",": "002c",
  "<": "003c",
  ".": "002e",
  ">": "003e",
  "/": "002f",
  "?": "003f",
}

export const transformKeyboardLayout = (layout: KeyboardLayout): string => {
  // builds the .klc file content

  const date = new Date()

  let klcContent = `KBD\tLayout${layout.number}\t"Georgian (${layout.title}) - ${layout.number}"

COPYRIGHT\t"(c) ${date.getFullYear()} Company"

COMPANY\t"Company"

LOCALENAME\t"ka-GE"

LOCALEID\t""00000437"

VERSION\t1.0

SHIFTSTATE

0
1
2
6

LAYOUT\t\t;an extra '@' at the end is a dead key

//SC	VK_		Cap	0	1	2	6
//--	----		----	----	----	----	----

02	1		0	1	0021	-1	-1		// DIGIT ONE, EXCLAMATION MARK, <none>, <none>
03	2		0	2	0040	-1	201e		// DIGIT TWO, COMMERCIAL AT, <none>, DOUBLE LOW-9 QUOTATION MARK
04	3		0	3	0023	-1	201c		// DIGIT THREE, NUMBER SIGN, <none>, LEFT DOUBLE QUOTATION MARK
05	4		0	4	0024	-1	-1		// DIGIT FOUR, DOLLAR SIGN, <none>, <none>
06	5		0	5	0025	-1	20ac		// DIGIT FIVE, PERCENT SIGN, <none>, EURO SIGN
07	6		0	6	005e	-1	-1		// DIGIT SIX, CIRCUMFLEX ACCENT, <none>, <none>
08	7		0	7	0026	-1	-1		// DIGIT SEVEN, AMPERSAND, <none>, <none>
09	8		0	8	002a	-1	00b0		// DIGIT EIGHT, ASTERISK, <none>, DEGREE SIGN
0a	9		0	9	0028	-1	-1		// DIGIT NINE, LEFT PARENTHESIS, <none>, <none>
0b	0		0	0	0029	-1	-1		// DIGIT ZERO, RIGHT PARENTHESIS, <none>, <none>
`
  const helperStringPrefix: string[] = [
    "0c	OEM_MINUS	0	002d	005f	-1	2014		// HYPHEN-MINUS, LOW LINE, <none>, EM DASH",
    "0d	OEM_PLUS	0	003d	002b	-1	2013		// EQUALS SIGN, PLUS SIGN, <none>, EN DASH",
    "10	Q		0",
    "11	W		0",
    "12	E		0",
    "13	R		0",
    "14	T		0",
    "15	Y		0",
    "16	U		0",
    "17	I		0",
    "18	O		0",
    "19	P		0",
    "1a	OEM_4		0",
    "1b	OEM_6		0",
    "1e	A		0",
    "1f	S		0",
    "20	D		0",
    "21	F		0",
    "22	G		0",
    "23	H		0",
    "24	J		0",
    "25	K		0",
    "26	L		0",
    "27	OEM_1		0",
    "28	OEM_7		0",
    "29	OEM_3		0	201e	201c	-1	-1		// DOUBLE LOW-9 QUOTATION MARK, LEFT DOUBLE QUOTATION MARK, <none>, <none>",
    "2b	OEM_5		0	007e	007c	-1	-1		// TILDE, VERTICAL LINE, <none>, <none>",
    "2c	Z		0",
    "2d	X		0",
    "2e	C		0",
    "2f	V		0",
    "30	B		0",
    "31	N		0",
    "32	M		0",
    "33	OEM_COMMA	0",
    "34	OEM_PERIOD	0",
    "35	OEM_2		0",
  ]

  const helperStringSuffix: { [id: number]: string } = {
    0: "2014",
    1: "2013",
    4: "10f1",
    5: "00ae",
    7: "10f8",
    9: "10f2",
    14: "10fa",
    17: "10f6",
    18: "10f9",
    19: "10f5",
    20: "10f7",
    28: "10f4",
    29: "00a9",
    30: "10f3",
    32: "10fc",
    34: "00ab",
    35: "00bb",
    36: "10fb",
  }

  let index = 0

  function get(obj: any, key: string) {
    return obj[key]
  }

  function helperFunc(key: KeyboardKey) {
    klcContent += helperStringPrefix[index] + "\t"
    if (keyMapDato.hasOwnProperty(key.value[0])) {
      klcContent += get(keyMapDato, key.value[0]) + "\t"
    } else {
      klcContent += "-1\t"
    }
    if (keyMapDato.hasOwnProperty(key.value[1])) {
      klcContent += get(keyMapDato, key.value[1]) + "\t"
    } else {
      klcContent += "-1\t"
    }
    klcContent += "-1\t"
    if (helperStringSuffix.hasOwnProperty(index)) {
      klcContent += helperStringSuffix[index] + "\t"
    } else klcContent += "-1\t"
    klcContent += "\n"
    index += 1
  }

  layout.keyboard.forEach((key) => {
    if (Array.isArray(key.value)) {
      if (index == 25) {
        klcContent += helperStringPrefix[25] + "\n"
        klcContent += helperStringPrefix[26] + "\n"
        index += 2
      }
      if (georgianLetters.includes(key.value[0]) || georgianLetters.includes(key.value[1])) {
        helperFunc(key)
      } else if (punctuation.includes(key.value[0]) || punctuation.includes(key.value[1])) {
        if (!["\\", "|"].includes(key.value[0])) {
          helperFunc(key)
        }
      } else if (key.value[0] === "" && key.value[1] === "") {
        helperFunc(key)
      }
    }
  })

  // adds fixed content
  klcContent += `39	SPACE		0	0020	0020	0020	-1		// SPACE, SPACE, SPACE, <none>
56	OEM_102	0	005c	-1	-1	-1		// REVERSE SOLIDUS, <none>, <none>, <none>
53	DECIMAL	0	002c	002c	-1	-1		// COMMA, COMMA, , 


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

0409\tGeorgian (${layout.title}) - ${layout.number}
LANGUAGENAMES

0409\tGeorgian (Georgia)
ENDKBD
`

  return klcContent
}

export const downloadKLCFile = (content: string, filename: string) => {
  // Ensure Windows-style line endings (windows users: \r\n, while linux -- \n)
  const formattedContent = content.replace(/\n/g, "\r\n")

  const blob = new Blob([formattedContent], {
    type: "text/plain",
  })
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
