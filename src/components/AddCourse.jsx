import React, { useState } from "react";
import Layout from "../layout/Layout";
import { loggedUser } from "../utils/getCookies";
import { client } from "../client";
import { v4 as uuidv4 } from "uuid";
import CardInput from "./CardInput";


const AddCourse = () => {
  const [cardsInput, setCardsInput] = useState([0, 1, 2]); // Start with one card
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    cards: [],
    author: "",
    dateCreated: "",
  });

  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const uploadImage = async (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/tiff" ||
      type === "image/gif" ||
      type === "image/jpeg" ||
      type === "image/svg"
    ) {
      setWrongImageType(false);

      try {
        const doc = await client.assets.upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        });

        setImageAsset(doc); // Set the uploaded image asset in your state
        console.log("Image uploaded successfully:", doc);
      } catch (error) {
        console.error("Image upload error:", error); // Log the error
      }
    } else {
      setWrongImageType(true);
    }
  };

  console.log(imageAsset);

  // Handling course input
  const handleChange = (input) => (e) => {
    e.preventDefault();
    setCourseInfo({ ...courseInfo, [input]: e.target.value });
  };

  // Handling card input
  const handleCardChange = (index) => (field) => (e) => {
    const updatedCards = [...courseInfo.cards];
    const value = e.target.value;

    // Ensure the cards array has an object for this index
    if (!updatedCards[index]) {
      updatedCards[index] = {};
    }

    updatedCards[index][field] = value;
    setCourseInfo({ ...courseInfo, cards: updatedCards });
  };

  const saveCourse = async () => {
    try {
      // Create card documents first
      const cardRefs = await Promise.all(
        courseInfo.cards.map(async (card) => {
          const cardDoc = {
            _type: "card",
            term: card.term,
            type: card.type,
            definition: card.definition,
            image: imageAsset.url,
            example: card.example
          };
          const cardRes = await client.create(cardDoc);
          return {
            _key: uuidv4(), // Generate a unique key for each card
            _type: "reference",
            _ref: cardRes._id, // Reference the newly created card
          };
        })
      );

      // Create the course document
      const doc = {
        _type: "course",
        name: courseInfo.name,
        description: courseInfo.description,
        author: {
          _type: "reference",
          _ref: loggedUser, // Assuming loggedUser is the ID of the user document
        },
        dateCreated: new Date().toISOString(), // Sets the current date and time as the date created
        cards: cardRefs, // Attach the created card references to the course
      };

      const res = await client.create(doc);
      console.log("Course saved successfully:", res);
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCourse();
  };

  const handleAddCardInput = () => {
    setCardsInput([...cardsInput, cardsInput.length]); // Add a new card with unique index
  };

  return (
    <Layout>
      <form onSubmit={(e) => handleSubmit(e)} action="">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={courseInfo.name}
          placeholder="Enter Course Name"
          onChange={handleChange("name")}
        />
        <label htmlFor="description">Desc</label>
        <input
          type="text"
          name="description"
          value={courseInfo.description}
          placeholder="Enter Course Description"
          onChange={handleChange("description")}
        />

        <div className="cards-input">
          {cardsInput.map((cardInput, index) => {
            return (
              <CardInput
                key={index}
                index={index}
                handleChange={handleCardChange(index)}
                handleUploadImage={uploadImage}
              />
            );
          })}
          <span className="" onClick={handleAddCardInput}>
            Add More Card
          </span>
        </div>

        <button type="submit">Create</button>
      </form>
    </Layout>
  );
};


export default AddCourse;
