"use client";

import React, { useEffect, useRef } from "react";
import { Factory } from "vexflow";

interface Note {
  pitch: string;
  duration: string;
  isPressed?: boolean;
}

interface SheetMusicProps {
  notes: Note[];
  difficulty: string;
  currentNoteIndex: number;
  clef: 'treble' | 'bass';
}

const SheetMusic: React.FC<SheetMusicProps> = ({
  notes,
  difficulty,
  currentNoteIndex,
  clef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const vf = new Factory({
        renderer: {
          elementId: containerRef.current,
          x: 0,
          width: 240,
          height: difficulty === "hard" ? 200 : 150,
        },
      });

      vf.getContext().scale(1.2, 1.2);

      const score = vf.EasyScore();
      const system = vf.System({
        x: 0,
        width: 220,
      });

      system
        .addStave({
          voices: [
            score.voice(
              score.notes(notes.map((note) => `${note.pitch}/4`).join(", "))
            ),
          ],
        })
        .addClef(clef);

      vf.draw();

      console.log(notes.map((note) => `${note.pitch}/4`).join(", "));

      const noteElements = document.querySelectorAll(".vf-notehead");
      noteElements.forEach((ne, i) => {
        if (i < currentNoteIndex) {
          ne.setAttribute("fill", "red");
        }
      });
    }
  }, [notes, currentNoteIndex, difficulty, clef]);

  return (
    <div ref={containerRef} className="w-full bg-white flex justify-center" />
  );
};

export default SheetMusic;

