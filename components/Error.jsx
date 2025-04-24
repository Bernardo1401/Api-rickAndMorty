import Image from "next/image";
import styles from "../styles/Error.module.css";

export default function Loader() {
    return (
        <div className={styles.container}>
            <Image src="/naoEncontrado.gif" alt="Carregando..." width={300} height={300}  className={styles.image} />
            <h1 className={styles.message}>Personagem Não encontrado</h1>
        </div>
    );
}