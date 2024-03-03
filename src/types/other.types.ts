import { DifficultyLevel } from "./practiceText.types"

export interface SearchOptions {
  level: DifficultyLevel | null
  author: string | null
  textLength: {
    from: number | null
    to: number | null
  }
  written: {
    from: Date | null
    to: Date | null
  }
  added: {
    from: Date | null
    to: Date | null
  }
}
