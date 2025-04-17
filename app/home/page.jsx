"use client";

import styles from "../home/Home.module.css"
import {useEffect, useState} from "react";
import CharacterCard from "../../components/CharacterCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home () {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [notFound, setNotFound] = useState(false); 

  const fetchCharacters = async (name = "") => {
      try {
          const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
          setCharacters(data.results);
      } catch {
          setCharacters([]); 
          setNotFound(true);
      }
  };  
  useEffect(() => {
      fetchCharacters();
  }, []);

  const handleCardClick = (name) => {
    toast.info(`Você clicou em ${name}`, {
  });
  }

  return (
    <div className={styles.container}>
          <ToastContainer
        position="top-right" // "top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left"
        autoClose={7500} // tempo em milissegundos para o toast fechar automaticamente
        theme="light" // tema do toast, pode ser "light", "dark" ou "colored"
      />
        <h1 className={styles.title}>Personagens de Rick and Morty</h1>
        <div className={styles.controls}>
            <input type="text" placeholder="Buscar por nome" value={search} onChange={(e) => setSearch(e.target.value)} className={styles.input} />
            <button onClick={() => fetchCharacters(search.trim())} className={styles.buttonSearch}>
              Buscar
            </button>
            <button
                onClick={() => {
                    setSearch("");
                    fetchCharacters();
                }}
                className={styles.buttonReset}
            >
                Resetar
            </button>
        </div>
        {notFound && <h1 className={styles.notFound}>Nenhum personagem encontrado 😢</h1>}
        <div className={styles.grid}>
            {characters.map((char) => (
                <CharacterCard key={char.id} character={char} onClick={() => handleCardClick(char.nome)} />))}
        </div>
    </div>
);
}