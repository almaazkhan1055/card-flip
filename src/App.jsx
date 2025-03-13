import React, { useEffect, useState } from "react";

const App = () => {
  const cardArr = ["A", "C", "D", "A", "B", "B", "C", "D"];

  const [cardObj, setCardObj] = useState(
    cardArr.map((card) => {
      return {
        name: card,
        isOpen: false,
        id: null,
      };
    })
  );

  const flippedCard = cardObj.filter((card) => card.isOpen === true);
  const sortedFlippedCard = flippedCard.sort((a, b) => a.id - b.id);

  const handleCardFlip = (index) => {
    const duplicatedCardObjArr = [...cardObj];
    duplicatedCardObjArr[index].isOpen = !duplicatedCardObjArr[index].isOpen;
    duplicatedCardObjArr[index].id = Date.now();
    setCardObj(duplicatedCardObjArr);
  };

  let latestCard = null;
  let beforeLatestCard = null;

  useEffect(() => {
    if (sortedFlippedCard.length % 2 === 0) {
      latestCard = sortedFlippedCard[sortedFlippedCard.length - 1];
      beforeLatestCard = sortedFlippedCard[sortedFlippedCard.length - 2];
      if (latestCard?.name !== beforeLatestCard?.name) {
        latestCard.isOpen = false;
        beforeLatestCard.isOpen = false;
      }
    }
  }, [flippedCard]);

  return (
    <div className="grid grid-cols-4 place-items-center gap-10 p-10 font-semibold">
      {cardArr.map((card, index) => (
        <div
          className="border-2 border-black w-[200px] h-[300px] flex items-center justify-center cursor-pointer"
          key={index}
          onClick={() => handleCardFlip(index)}
        >
          {cardObj[index]?.isOpen ? (
            card.toUpperCase()
          ) : (
            <span>click to reveal</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
