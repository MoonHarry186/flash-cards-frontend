import React, { useState } from "react";

const Card = ({term, type, definition, image, example}) => {
  const [isFront, setIsFront] = useState(true);

  return isFront ? (
    <div
      onClick={() => setIsFront(!isFront)}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {term} {type}
      </h5>
    </div>
  ) : (
    <div
      onClick={() => setIsFront(!isFront)}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {definition}
      </p>
      {image ? <img src={image} alt="Image" /> : ''}
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {example}
      </p>
    </div>
  );
};

export default Card;
