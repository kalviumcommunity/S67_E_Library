// import React from "react";

// const BookCard = ({ title, author, genre, coverImage }) => {
//   return (
//     <div className="max-w-xs bg-white shadow-lg rounded-2xl overflow-hidden p-4">
//       <img src={coverImage} alt={title} className="w-full h-48 object-cover rounded-lg" />
//       <div className="mt-4">
//         <h2 className="text-xl font-bold">{title}</h2>
//         <p className="text-gray-600">by {author}</p>
//         <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mt-2 text-sm">
//           {genre}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default BookCard;



import React from "react";

const BookCard = ({ title, author, genre, coverImage }) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-2xl overflow-hidden p-4 transition-transform transform hover:scale-105">
      <img 
        src={coverImage} 
        alt={`Cover of ${title}`} 
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">by {author}</p>
        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mt-2 text-sm">
          {genre}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
