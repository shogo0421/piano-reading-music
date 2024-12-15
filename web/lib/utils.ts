import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  bassDifficultNotes,
  bassEasyNotes,
  bassMediumNotes,
  trebleDifficultNotes,
  trebleEasyNotes,
  trebleMediumNotes,
} from "@/lib/notes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomNotes = (
  count: number,
  difficulty: string,
  clef: "treble" | "bass"
) => {
  let notes: string[] = [];
  if (clef === "treble") {
    switch (difficulty) {
      case "easy": {
        notes = trebleEasyNotes;
        break;
      }
      case "medium": {
        notes = trebleMediumNotes;
        break;
      }
      case "difficult": {
        notes = trebleDifficultNotes;
        break;
      }
    }
  } else {
    switch (difficulty) {
      case "easy": {
        notes = bassEasyNotes;
        break;
      }
      case "medium": {
        notes = bassMediumNotes;
        break;
      }
      case "difficult": {
        notes = bassDifficultNotes;
        break;
      }
    }
  }

  return Array.from({ length: count }, () => ({
    pitch: notes[Math.floor(Math.random() * notes.length)],
    duration: "quarter",
    isPressed: false,
  }));
};
