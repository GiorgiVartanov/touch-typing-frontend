import ajax from "./ajax"

import { SearchOptions } from "../types/other.types"

export const getPracticeTexts = (
  searchValue: string,
  searchOptions: SearchOptions,
  page: number
) => {
  const {
    level,
    author,
    textLength: { from: textLengthMin, to: textLengthMax },
    written: { from: writtenAfter, to: writtenBefore },
    added: { from: addedAfter, to: addedBefore },
  } = searchOptions

  const levelToSearch = level === "Any" ? "" : level

  const url =
    `/practice/texts?` +
    `text=${searchValue}&` +
    `level=${levelToSearch?.toString() ?? ""}&` +
    `author=${author ?? ""}&` +
    `textLengthMin=${textLengthMin?.toString() ?? ""}&` +
    `textLengthMax=${textLengthMax?.toString() ?? ""}&` +
    `writtenAfter=${writtenAfter?.toString() ?? ""}&` +
    `writtenBefore=${writtenBefore?.toString() ?? ""}&` +
    `addedAfter=${addedAfter?.toString() ?? ""}&` +
    `addedBefore=${addedBefore?.toString() ?? ""}&` +
    `page=${page}`

  return ajax.get(url)
}

export const getPracticeText = (id: string) => {
  return ajax.get(`/practice/${id}`)
}

export const postPracticeText = (
  title: string,
  description: string,
  level: string,
  text: string,
  token: string
) => {
  return ajax.post(
    "practice/create",
    {
      title: title,
      description: description,
      level: level,
      text: text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
