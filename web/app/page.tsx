"use client";

import React, { useState, useEffect, useCallback } from "react";
import PianoKeyboard from "../components/piano-keyboard";
import SheetMusic from "../components/sheet-music";
import Celebration from "../components/celebration";
import SettingsModal from "../components/settings-modal";

const generateRandomNotes = (count: number, difficulty: string) => {
  let notes: string[] = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  if (difficulty === "medium" || difficulty === "hard") {
    notes = notes.concat(["C#4", "D#4", "F#4", "G#4", "A#4", "B#4"]);
    if (difficulty === "hard") {
      notes = notes.concat([
        "C3",
        "C#3",
        "D3",
        "D#3",
        "E3",
        "F3",
        "F#3",
        "G3",
        "G#3",
        "A3",
        "A#3",
        "B3",
        "C5",
        "C#5",
        "D5",
        "D#5",
        "E5",
        "F5",
        "F#5",
        "G5",
        "G#5",
        "A5",
        "A#5",
        "B5",
      ]);
    }
  }
  return Array.from({ length: count }, () => ({
    pitch: notes[Math.floor(Math.random() * notes.length)],
    duration: "quarter",
    isPressed: false,
  }));
};

export default function Home() {
  const [difficulty, setDifficulty] = useState("easy");
  const [showNoteNames, setShowNoteNames] = useState(false);
  const [noteNameStyle, setNoteNameStyle] = useState<"alphabet" | "solfege">(
    "alphabet"
  );
  const [clef, setClef] = useState<"treble" | "bass">("treble");
  const [notes, setNotes] = useState(generateRandomNotes(4, difficulty));
  const [pressedNote, setPressedNote] = useState<string | null>(null);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastPlayedNote, setLastPlayedNote] = useState<string>("");
  const [noteCount, setNoteCount] = useState(4);

  const resetGame = useCallback(() => {
    setNotes(generateRandomNotes(noteCount, difficulty));
    setCurrentNoteIndex(0);
    setShowCelebration(false);
  }, [difficulty, noteCount]);

  useEffect(() => {
    resetGame();
  }, [difficulty, clef, noteCount, resetGame]);

  useEffect(() => {
    if (currentNoteIndex === notes.length) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
        resetGame();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentNoteIndex, notes.length, resetGame]);

  useEffect(() => {
    if (pressedNote) {
      const timer = setTimeout(() => {
        setPressedNote(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pressedNote]);

  const handlePlay = useCallback(
    (note: string) => {
      setPressedNote(note);
      setLastPlayedNote(note);
      if (note === notes[currentNoteIndex].pitch) {
        const updatedNotes = [...notes];
        updatedNotes[currentNoteIndex] = {
          ...updatedNotes[currentNoteIndex],
          isPressed: true,
        };
        setNotes(updatedNotes);
        setCurrentNoteIndex((prevIndex) => prevIndex + 1);
      }
      console.log(`Playing note: ${note}`);
    },
    [currentNoteIndex, notes]
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">譜読み練習</h1>
      <div className="w-full max-w-3xl mb-4">
        <SheetMusic
          notes={notes}
          currentNoteIndex={currentNoteIndex}
          difficulty={difficulty}
          clef={clef}
        />
      </div>
      <div className="text-2xl font-bold text-center my-4 h-8">
        {lastPlayedNote ? lastPlayedNote : "\u00A0"}
      </div>
      <div className="w-full max-w-3xl flex justify-center">
        <PianoKeyboard
          onPlay={handlePlay}
          pressedNote={pressedNote}
          showNoteNames={showNoteNames}
          noteNameStyle={noteNameStyle}
          difficulty={difficulty}
        />
      </div>
      <div className="mt-8 flex space-x-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Reset
        </button>
        <SettingsModal
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          showNoteNames={showNoteNames}
          setShowNoteNames={setShowNoteNames}
          noteNameStyle={noteNameStyle}
          setNoteNameStyle={setNoteNameStyle}
          clef={clef}
          setClef={setClef}
          noteCount={noteCount}
          setNoteCount={setNoteCount}
        />
      </div>
      <Celebration isVisible={showCelebration} />
    </main>
  );
}
