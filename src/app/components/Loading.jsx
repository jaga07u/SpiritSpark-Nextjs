import React, { useState, useEffect } from 'react';
import { FaOm } from "react-icons/fa";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin text-blue-500 text-8xl">
        <FaOm />
      </div>
    </div>
  );
}

export default Loading;
