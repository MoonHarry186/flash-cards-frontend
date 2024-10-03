import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { cardsQuery, coursesQuery, coursesQueryById } from "../utils/data";
import { client } from "../client";
import Card from "./Card";
import { useParams } from "react-router-dom";
const Course = () => {
  const [cardsList, setCardsList] = useState([]);
  const {id} = useParams()
  useEffect(() => {
    if (coursesQuery) {
      client.fetch(coursesQueryById(id)).then((data) => {
        console.log(data[0])
        setCardsList(data[0].cards);
      });
    }
  }, []);
  
  return (
    <Layout>
      {cardsList?.length > 0 &&
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
