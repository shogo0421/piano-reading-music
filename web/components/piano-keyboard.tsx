import { basePianoKeys } from "@/lib/notes";
import { Clef, Difficulty } from "@/lib/utils";
import React, { useMemo } from "react";

type NoteNameStyle = "alphabet" | "solfege";

const noteNameMap: Record<string, Record<NoteNameStyle, string>> = {
  C: { alphabet: "C", solfege: "ド" },
  "C#": { alphabet: "C#", solfege: "ド#" },
  D: { alphabet: "D", solfege: "レ" },
  "D#": { alphabet: "D#", solfege: "レ#" },
  E: { alphabet: "E", solfege: "ミ" },
  F: { alphabet: "F", solfege: "ファ" },
  "F#": { alphabet: "F#", solfege: "ファ#" },
  G: { alphabet: "G", solfege: "ソ" },
  "G#": { alphabet: "G#", solfege: "ソ#" },
  A: { alphabet: "A", solfege: "ラ" },
  "A#": { alphabet: "A#", solfege: "ラ#" },
  B: { alphabet: "B", solfege: "シ" },
};

interface PianoKeyProps {
  note: string;
  isBlack?: boolean;
  onPlay: (note: string) => void;
  isPressed: boolean;
  showNoteName: boolean;
  noteNameStyle: NoteNameStyle;
}

const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  isBlack = false,
  onPlay,
  isPressed,
  showNoteName,
  noteNameStyle,
}) => {
  const noteName = useMemo(
    () => noteNameMap[note.slice(0, -1)][noteNameStyle],
    [note, noteNameStyle]
  );

  return (
    <div
      className={`
        ${isBlack ? "bg-black z-10" : "bg-white"}
        ${isPressed ? "pressed" : ""}
        ${isBlack ? "w-5 h-20 -mx-2.5" : "w-8 h-32"}
        rounded-b-md shadow-md cursor-pointer transition-all duration-150 relative
      `}
      onClick={() => onPlay(note)}
    >
      {showNoteName && (
        <span
          className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs ${
            isBlack ? "text-white" : "text-black"
          }`}
        >
          {noteName}
        </span>
      )}
    </div>
  );
};

export const difficultyToPianoKeysMap = {
  treble: {
    easy: [...basePianoKeys.map((note) => `${note}4`).concat(["C5"])],
    medium: [...basePianoKeys.map((note) => `${note}4`).concat(["C5"])],
    hard: [
      ...basePianoKeys
        .map((note) => `${note}3`)
        .concat(basePianoKeys.map((note) => `${note}4`))
        .concat(basePianoKeys.map((note) => `${note}5`))
        .concat(["C6"]),
    ],
  },
  bass: {
    easy: [...basePianoKeys.map((note) => `${note}2`).concat(["C3"])],
    medium: [...basePianoKeys.map((note) => `${note}2`).concat(["C3"])],
    hard: [
      ...basePianoKeys
        .map((note) => `${note}1`)
        .concat(basePianoKeys.map((note) => `${note}2`))
        .concat(basePianoKeys.map((note) => `${note}3`))
        .concat(["C4"]),
    ],
  },
};

interface PianoKeyboardProps {
  onPlay: (note: string) => void;
  pressedNote: string | null;
  showNoteNames: boolean;
  noteNameStyle: NoteNameStyle;
  clef: Clef;
  difficulty: Difficulty;
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  onPlay,
  pressedNote,
  showNoteNames,
  noteNameStyle,
  clef,
  difficulty,
}) => {
  const keyStyles = `
  @keyframes pressedAnimation {
    0%, 100% { background-color: inherit; }
    50% { background-color: #ef4444; }
  }
  .pressed {
    animation: pressedAnimation 1s ease;
  }
`;

  const keys = useMemo(
    () => difficultyToPianoKeysMap[clef][difficulty],
    [clef, difficulty]
  );

  return (
    <div className="w-full overflow-x-auto pb-4">
      <style>{keyStyles}</style>
      <div className="flex relative min-w-max justify-center">
        {keys.map((key, index) => (
          <PianoKey
            key={index}
            note={key}
            isBlack={key.includes("#")}
            onPlay={onPlay}
            isPressed={pressedNote === key}
            showNoteName={showNoteNames}
            noteNameStyle={noteNameStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default PianoKeyboard;
