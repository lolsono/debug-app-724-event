import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // système de trie par la date la plus récente pour les events
  // retourne un tableaux trier par odre décroissants
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // système de roulement quand on arriver a la dernière carde on recommence
  const nextCard = () => {
    setTimeout(() => setIndex(index < byDateDesc.length ? index + 1 : 0), 5000);
  };

  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((eventitem, radioIdx) => (
                <input
                  key={eventitem.id} // Utilise un identifiant unique provenant des données
                  type="radio"
                  name="slider"
                  value={radioIdx}
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)} // Ajoute un gestionnaire onChange
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
