import { useEffect, useState } from "react";

// ===== SAMPLE DATA (expand to 1000 words later) =====
const data = [
  { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào", level: "HSK1" },
  { hanzi: "谢谢", pinyin: "xiè xie", meaning: "Cảm ơn", level: "HSK1" },
  { hanzi: "学生", pinyin: "xué shēng", meaning: "Học sinh", level: "HSK1" },
  { hanzi: "工作", pinyin: "gōng zuò", meaning: "Công việc", level: "HSK2" },
  { hanzi: "学习", pinyin: "xué xí", meaning: "Học tập", level: "HSK2" },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [mode, setMode] = useState("flashcard");
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);

  const word = data[index];

  // ===== SPEAK =====
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    speechSynthesis.speak(utterance);
  };

  // ===== NEXT WORD =====
  const next = () => {
    setShowMeaning(false);
    setIndex((prev) => (prev + 1) % data.length);
    setProgress(((index + 1) / data.length) * 100);
  };

  // ===== QUIZ =====
  const options = data
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((item) => item.meaning);

  if (!options.includes(word.meaning)) options[0] = word.meaning;

  const handleAnswer = (ans) => {
    if (ans === word.meaning) {
      setScore(score + 1);
    }
    next();
  };

  // ===== UI =====
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Tiếng Trung thầy Bình Shanghai
      </h1>

      {/* MODE SWITCH */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("flashcard")}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Flashcard
        </button>
        <button
          onClick={() => setMode("quiz")}
          className="px-3 py-1 bg-purple-500 text-white rounded"
        >
          Quiz
        </button>
      </div>

      {/* PROGRESS */}
      <div className="w-full max-w-md bg-gray-300 rounded-full h-3 mb-4">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* FLASHCARD MODE */}
      {mode === "flashcard" && (
        <div
          className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center cursor-pointer"
          onClick={() => setShowMeaning(!showMeaning)}
        >
          {!showMeaning ? (
            <>
              <div className="text-4xl">{word.hanzi}</div>
              <div className="text-gray-500">{word.pinyin}</div>
            </>
          ) : (
            <div className="text-xl">{word.meaning}</div>
          )}
        </div>
      )}

      {/* QUIZ MODE */}
      {mode === "quiz" && (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
          <div className="text-3xl mb-2">{word.hanzi}</div>
          <div className="text-gray-500 mb-4">{word.pinyin}</div>

          <div className="flex flex-col gap-2">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="bg-gray-200 p-2 rounded"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CONTROLS */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => speak(word.hanzi)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          🔊 Phát âm
        </button>

        <button
          onClick={next}
          className="px-4 py-2 bg-green-600 text-white rounded-xl"
        >
          ➡️ Tiếp
        </button>
      </div>

      {/* SCORE */}
      <div className="mt-4 text-lg">Điểm: {score}</div>

      {/* FOOTER */}
      <div className="mt-6 text-sm text-gray-500 text-center">
        An Bình Education - Học tiếng Trung hiệu quả
      </div>
    </div>
  );
}
