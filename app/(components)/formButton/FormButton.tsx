import React from 'react';
import Loader from '../loader/Loader';

const FormButton = ({ onClick, text, loading }:any) => {
  return (
    <button
      onClick={onClick}
      className="ms-2 text-[18px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {loading ? (
        <div className=' flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default FormButton;
