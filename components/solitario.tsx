"use client";
import React, { useState } from "react";
import Image from "next/image";
import fondo from "../public/assets/img/fondo.png";

const JuegoSolitario = () => {
  let mazoSolitario: string[] = [
    "1E",
    "1O",
    "1C",
    "1B",
    "2E",
    "2O",
    "2C",
    "2B",
    "3E",
    "3O",
    "3C",
    "3B",
    "4E",
    "4O",
    "4C",
    "4B",
    "5E",
    "5O",
    "5C",
    "5B",
    "6E",
    "6O",
    "6C",
    "6B",
    "7E",
    "7O",
    "7C",
    "7B",
    "8E",
    "8O",
    "8C",
    "8B",
    "9E",
    "9O",
    "9C",
    "9B",
    "10E",
    "10O",
    "10C",
    "10B",
    "11E",
    "11O",
    "11C",
    "11B",
    "12E",
    "12O",
    "12C",
    "12B",
  ];
  function mazoMezclado(array: string[]): string[] {
    let MazoMezclado = array.slice();
    for (let i = MazoMezclado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [MazoMezclado[i], MazoMezclado[j]] = [MazoMezclado[j], MazoMezclado[i]];
    }
    return MazoMezclado;
  }
  const [shuffledMazo, setShuffledMazo] = useState(mazoMezclado(mazoSolitario));
  const [play, setPlay] = useState(false);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [draggedCard, setDraggedCard] = useState<{
    card: string;
    index: number;
  } | null>(null);
  const [initialDrag, setInitialDrag] = useState(true);
  const [cardFollows, setCardFollows] = useState<{
    card: string;
    index: number;
  } | null>(null);
  const [history, setHistory] = useState<
    {
      shuffledMazo: string[];
      cardFollows: { card: string; index: number } | null;
    }[]
  >([]);
  const [allowedTypes, setAllowedTypes] = useState({
    "0-11": null,
    "12-23": null,
    "24-35": null,
    "36-48": null,
  });

  console.log("%c Line:80 🌮 history", "color:#4fff4B", history);
  console.log("%c Line:68 🍺 shuffledMazo", "color:#f5ce50", shuffledMazo);
  console.log("%c Line:71 🍅 flippedCards", "color:#93c0a4", flippedCards);
  console.log("%c Line:73 🍤 draggedCard", "color:#42b983", draggedCard);
  console.log("%c Line:79 🥃 cardFollows", "color:#6ec1c2", cardFollows);
  const handleCardClick = (card: string) => {
    if (flippedCards.includes(card)) {
      console.log("%c Line:75 🌮 card", "color:#3f7cff", card);
      setFlippedCards(flippedCards.filter((c) => c !== card));
    } else {
      setFlippedCards([...flippedCards, card]);
    }
  };
  const handleDragStart = (card: string, index: number) => {
    setDraggedCard({ card, index });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setShuffledMazo(previousState.shuffledMazo);
      setCardFollows(previousState.cardFollows);
    }
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    event.preventDefault();
    if (draggedCard) {
      const newMazo = [...shuffledMazo];
      const targetCard = newMazo[targetIndex];
      setHistory((prevHistory) => [
        ...prevHistory,
        { shuffledMazo: newMazo, cardFollows },
      ]);
      const rangeKey = getRangeKey(targetIndex);
      if (rangeKey === null) {
        alert("Invalid drop location.");
        return;
      }
      if (initialDrag) {
        newMazo[draggedCard.index] = "";
        setInitialDrag(false);
      } else {
        for (let i = 0; i < flippedCards.length; i++) {
          newMazo[draggedCard.index] = flippedCards[i - 1];
        }
      }

      const draggedCardLetter = draggedCard.card.slice(-1);

      if (allowedTypes[rangeKey] === null) {
        setAllowedTypes((prevTypes) => ({
          ...prevTypes,
          [rangeKey]: draggedCardLetter,
        }));
      } else if (allowedTypes[rangeKey] !== draggedCardLetter) {
        alert(`Lugar incorrecto`);
        return;
      }
      if (targetCard === "") {
        alert("you lost!");
        setPlay(false);
        return;
      }

      setCardFollows({ card: targetCard, index: targetIndex });
      newMazo[targetIndex] = draggedCard.card;
      if (targetCard && !flippedCards.includes(targetCard)) {
        setFlippedCards([...flippedCards, targetCard]);
      }
      setShuffledMazo(newMazo);
      setDraggedCard(null);
    }
  };
  const getRangeKey = (index: number) => {
    if (index >= 0 && index <= 11) return "0-11";
    if (index >= 12 && index <= 23) return "12-23";
    if (index >= 24 && index <= 35) return "24-35";
    if (index >= 36 && index <= 48) return "36-48";
    return null;
  };
  if (flippedCards.length === 48) {
    alert("you won!");
    return;
  }

  return (
    <>
      <header className="bg-blue-300 p-2">
        <button
          onClick={() => {
            setPlay(!play);
            setFlippedCards([]);
            setDraggedCard(null);
            setCardFollows(null);
            setShuffledMazo(mazoMezclado(mazoSolitario));
          }}
          className="bg-blue-500 rounded-lg p-2 mx-2 my-2 shadow-md "
        >
          Solitario
        </button>
      </header>
      <main>
        {play && (
          <div className="grid grid-cols-12 gap-2 mb-2">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="text-center text-white font-bold">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <div
          style={{ minHeight: "200px", cursor: "grabbing" }}
          className=" grid grid-cols-12 gap-2  bg-blue-950 rounded-md"
        >
          {play &&
            shuffledMazo.map((card, index) => {
              return (
                <div
                  key={card}
                  className="m-2 border-2 rounded-md"
                  onClick={() => handleCardClick(card)}
                  draggable={card !== ""}
                  onDragStart={() => handleDragStart(card, index)}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, index)}
                  style={{ minHeight: "100px" }}
                >
                  {card !== "" && (
                    <>
                      <Image
                        className="border-2 rounded-md"
                        src={
                          flippedCards.includes(card)
                            ? `/assets/img/${card}.png`
                            : fondo
                        }
                        alt={card}
                        width={130}
                        height={130}
                      />
                    </>
                  )}
                </div>
              );
            })}

          {cardFollows && (
            <div
              key={`follow-${cardFollows.index}`}
              className="absolute top-4/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-md"
              onClick={() => handleCardClick(cardFollows.card)}
              draggable={true}
              onDragStart={() =>
                handleDragStart(cardFollows.card, cardFollows.index)
              }
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, cardFollows.index)}
              style={{ minHeight: "100px" }}
            >
              <Image
                className="m-2 border-2 rounded-md"
                src={`/assets/img/${cardFollows.card}.png`}
                alt={cardFollows.card}
                width={160}
                height={160}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default JuegoSolitario;
