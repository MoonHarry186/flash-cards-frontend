import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { cardsQuery } from "../utils/data";
import { client } from "../client";
import Card from "./Card";
const Course = () => {
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    if (cardsQuery) {
      client.fetch(cardsQuery).then((data) => {
        setCardsList(data);
      });
    }
  }, []);
  
  return (
    <Layout>
      {cardsList.length > 0 &&
        cardsList.map((card) => (
          <Card
          key={card._id}
            term={card.term}
            type={card.type}
            definition={card.definition}
            image={card.image}
            example={card.example}
          />
        ))}
    </Layout>
  );
};

export default Course;
