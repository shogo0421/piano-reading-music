"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import PianoKeyboard from "../components/piano-keyboard";
import SheetMusic from "../components/sheet-music";
import Celebration from "../components/celebration";
import SettingsModal from "../components/settings-modal";
import { Button } from "@/components/ui/button";
import { Clef, Difficulty, generateRandomNotes } from "@/lib/utils";

export default function Home() {
  const [noteCount, setNoteCount] = useState(4);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.easy);
  const [clef, setClef] = useState<Clef>(Clef.treble);

  const randomNotes = useMemo((): {
    pitch: string;
    duration: string;
    isPressed: boolean;
  }[] => {
    return generateRandomNotes(noteCount, difficulty, clef);
  }, [clef, difficulty, noteCount]);

  const [showNoteNames, setShowNoteNames] = useState(false);
  const [noteNameStyle, setNoteNameStyle] = useState<"alphabet" | "solfege">(
    "alphabet"
  );
  const [notes, setNotes] = useState(randomNotes);
  const [pressedNote, setPressedNote] = useState<string | null>(null);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastPlayedNote, setLastPlayedNote] = useState<string>("");

  const resetGame = useCallback(() => {
    setNotes(generateRandomNotes(noteCount, difficulty, clef));
    setCurrentNoteIndex(0);
    setShowCelebration(false);
  }, [clef, difficulty, noteCount]);

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
          clef={clef}
          difficulty={difficulty}
        />
      </div>
      <div className="mt-8 flex space-x-4">
        <Button onClick={resetGame} variant="default">
          リセット
        </Button>
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
