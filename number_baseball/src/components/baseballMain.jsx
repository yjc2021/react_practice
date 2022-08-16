import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import BaseballHistory from "./baseballHistory";
import BaseballInput from "./baseballInput";
import Speak from "./speak";

const BaseballMain = () => {
  const MAX_HITS = useRef(10);
  const [answer, setAnswer] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState();
  const [isOver, setIsOver] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const restart = useCallback(() => {
    setIsOver(false);
    setIsClear(false);
    setHistory([]);
    setPrediction("");
    setResult();
    setAnswer([]);
  }, []);
  const compareAnswer = useCallback(
    (entry) => {
      let s = 0;
      let b = 0;
      for (let i = 0; i < 4; i++) {
        const t = entry.findIndex((x) => x === answer[i]);
        if (t !== -1) {
          i === t ? s++ : b++;
        }
      }
      s === 4 && setIsClear(true);
      return { s: s, b: b };
    },
    [answer]
  );
  const onSubmit = useCallback(() => {
    const a = prediction.split("");
    setPrediction("");
    const newEntry = a.map((item) => parseInt(item));
    const s = speak(compareAnswer(newEntry));
    setHistory((cur) => [...cur, s]);
    setResult(s);
  }, [compareAnswer, prediction]);
  const speak = (entry) => {
    const { s, b } = entry;
    return `${s}스트라이크 ${b}볼`;
  };
  useEffect(() => {
    let arr = [];
    while (arr.length < 4) {
      const tmp = Math.floor(Math.random() * 10);
      if (arr.some((val) => val === tmp)) continue;
      arr.push(tmp);
    }
    setAnswer(arr);
    console.log(arr);
  }, []);

  useEffect(() => {
    if (history.length === MAX_HITS.current) setIsOver(true);
  }, [history]);
  return (
    <>
      <h1>숫자 야구</h1>
      {result && (
        <Speak
          answer={answer}
          result={result}
          isOver={isOver}
          isClear={isClear}
        />
      )}
      <BaseballInput prediction={prediction} setPrediction={setPrediction} />
      {!isOver && !isClear && <button onClick={onSubmit}>입력</button>}
      {(isOver || isClear) && <button onClick={restart}>다시하기</button>}
      <BaseballHistory history={history} />
    </>
  );
};

export default React.memo(BaseballMain);
