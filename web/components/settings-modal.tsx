import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Clef, Difficulty } from "@/lib/utils";

interface SettingsModalProps {
  difficulty: string;
  setDifficulty: (difficulty: Difficulty) => void;
  showNoteNames: boolean;
  setShowNoteNames: (show: boolean) => void;
  noteNameStyle: "alphabet" | "solfege";
  setNoteNameStyle: (style: "alphabet" | "solfege") => void;
  clef: Clef;
  setClef: (clef: Clef) => void;
  noteCount: number;
  setNoteCount: (count: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  difficulty,
  setDifficulty,
  showNoteNames,
  setShowNoteNames,
  noteNameStyle,
  setNoteNameStyle,
  clef,
  setClef,
  noteCount,
  setNoteCount,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">設定</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>設定</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <h3 className="text-lg font-medium">難易度</h3>
            <RadioGroup value={difficulty} onValueChange={setDifficulty}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy">初級</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">中級</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard">上級</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <h3 className="text-lg font-medium">音符の数</h3>
            <RadioGroup
              value={noteCount.toString()}
              onValueChange={(value) => setNoteCount(parseInt(value))}
            >
              {[1, 2, 3, 4].map((count) => (
                <div key={count} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={count.toString()}
                    id={`note-count-${count}`}
                  />
                  <Label htmlFor={`note-count-${count}`}>{count}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <h3 className="text-lg font-medium">音部記号</h3>
            <RadioGroup value={clef} onValueChange={setClef}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="treble" id="treble" />
                <Label htmlFor="treble">ト音記号</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bass" id="bass" />
                <Label htmlFor="bass">ヘ音記号</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-note-names" className="text-lg font-medium">
              音階名を表示
            </Label>
            <Switch
              id="show-note-names"
              checked={showNoteNames}
              onCheckedChange={setShowNoteNames}
            />
          </div>
          {showNoteNames && (
            <div>
              <RadioGroup
                value={noteNameStyle}
                onValueChange={setNoteNameStyle}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alphabet" id="alphabet" />
                  <Label htmlFor="alphabet">アルファベット (C, D, E...)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solfege" id="solfege" />
                  <Label htmlFor="solfege">カタカナ (ド, レ, ミ...)</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
