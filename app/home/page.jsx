"use client";

import { useState, useEffect } from "react";

import styles from "./Home.module.css"
import CharacterCard from "../../components/CharacterCard"
import axios from "axios";

export default function Home() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios
        .get('https://rickandmortyapi.com/api/character')
        .then(response => {
            setCharacters(response.data.results)
        })
        .catch ((error) => {
            console.error('Erro ao buscar personagem: ', error)
        });
    },[]);

    return (
        <div className={styles.container}>
            <div className={styles.grid} >
            {characters.map((char) => (
                <CharacterCard key={char.id} character={char} />
            ))}
            </div>
        </div>
    );
}