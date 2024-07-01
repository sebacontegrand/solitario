"use client";
import React, { useState } from "react";
import Designer from "../public/assets/Designer.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Solitario from "./solitario/page";
const TrucoHomePage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [SolitarioOpen, setSolitarioOpen] = useState(false);
  const handleClick = () => {
    setSolitarioOpen(true);
  };
  return (
    <div>
      <header className="flex flex-row items-center justify-between p-2 bg-slate-900 text-gray-500 font-extrabold text-4xl">
        Solitario para la Selección Argentina
        <Image
          src={Designer}
          alt={"header"}
          className="w-full h-48 object-scale-down "
        />
      </header>
      <main className="flex flex-row items-center justify-evenly p-2 bg-blue-300 text-gray-300 font-extrabold text-4xl">
        <div className="flex flex-row items-center  px-2 ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-500 rounded-lg p-2 shadow-md"
          >
            Jugar
          </button>
        </div>
      </main>
      {isOpen && (
        <>
          <div className="items-center justify-between p-2 bg-white text-gray-500 font-extrabold text-4xl">
            <button
              onClick={handleClick}
              className="bg-blue-500 rounded-lg p-2 mx-2 my-2 shadow-md "
            >
              Vamos Argentina...!!
            </button>
          </div>
        </>
      )}
      {SolitarioOpen && <Solitario />}
    </div>
  );
};

export default TrucoHomePage;
