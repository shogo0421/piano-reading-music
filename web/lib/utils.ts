import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  bassDifficultNotes,
  bassEasyNotes,
  bassMediumNotes,
  trebleHardNotes,
  trebleEasyNotes,
  trebleMediumNotes,
} from "@/lib/notes";

export const Clef = {
  treble: "treble",
  bass: "bass",
} as const;
export type Clef = (typeof Clef)[keyof typeof Clef];

export const Difficulty = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
} as const;
export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const difficultyToNotesMap = {
  treble: {
    easy: trebleEasyNotes,
    medium: trebleMediumNotes,
    hard: trebleHardNotes,
  },
  bass: {
    easy: bassEasyNotes,
    medium: bassMediumNotes,
    hard: bassDifficultNotes,
  },
};

export const generateRandomNotes = (
  count: number,
  difficulty: Difficulty,
  clef: Clef
) => {
  const notes: string[] = difficultyToNotesMap[clef][difficulty];

  return Array.from({ length: count }, () => ({
    pitch: notes[Math.floor(Math.random() * notes.length)],
    duration: "quarter",
    isPressed: false,
  }));
};
