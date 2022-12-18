import useSWR from "swr";

import { useRouter } from "next/router";
import { Spin } from "antd";

import { Header } from "../../components/Header";
import { Fetcher } from "../../components/Fetcher";
import { Back } from "../../components/Back";
import { Error } from "../../components/Error";
import styles from "../../styles/Cardnumber.module.css";

export default function Card() {
  const router = useRouter();
  const { cardnumber } = router.query;

  const { data, error } = useSWR(
    `https://digimoncard.io/api-public/search.php?card=${cardnumber}`,
    Fetcher
  );

  if (error) {
    return (
      <>
        <Error error={error} />
        <Back />
      </>
    );
  }

  if (!data || data.Search === "") {
    return <Spin />;
  }

  document.body.style.margin = 0;

  return (
    <div>
      <Header />
      <div className={styles.container}>
        {data.map((m) => (
          <div>
            <div className={styles.column1}>
              <img
                src={`https://images.digimoncard.io/images/cards/${m.cardnumber}.jpg`}
                className={styles.image}
              />
            </div>

            <div className={styles.column2}>
              <div style={{ paddingLeft: "14px" }}>
                <h1 className={styles.cardName}>{m.name}</h1>
                <ul className={styles.listInformation}>
                  <li className={styles.listInformation2}>
                    <span className={styles.spanInfo}>Cor</span>
                    <p style={{ margin: "4px 8px" }}>{m.color}</p>
                  </li>

                  <li className={styles.listInformation2}>
                    <span className={styles.spanInfo}>Número</span>
                    <p style={{ margin: "4px 8px" }}>{m.cardnumber}</p>
                  </li>

                  <li className={styles.listInformation2}>
                    <span className={styles.spanInfo}>Tipo</span>
                    <p style={{ margin: "4px 8px" }}>{m.type}</p>
                  </li>

                  <li className={styles.listInformation2}>
                    <span className={styles.spanInfo}>Raridade</span>
                    <p style={{ margin: "4px 8px" }}>{m.cardrarity}</p>
                  </li>

                  <li className={styles.listInformation2}>
                    <span className={styles.spanInfo}>Level</span>
                    <p style={{ margin: "4px 8px" }}>{m.level}</p>
                  </li>

                  <li className={styles.listInformation2}>
                    <span className={styles.spanInfo}>Custo de jogo</span>
                    <p style={{ margin: "4px 8px" }}>{m.play_cost}</p>
                  </li>

                  <li className={styles.listInformation2}>
                    <span className={styles.spanInfo}>Atributo</span>
                    <p style={{ margin: "4px 8px" }}>{m.attribute}</p>
                  </li>

                  <li className={styles.listInformation2}>
                    <span className={styles.spanInfo}>Artista</span>
                    <p style={{ margin: "4px 8px" }}>{m.artist}</p>
                  </li>

                  <li className={styles.listInformation2}>
                    <span className={styles.spanInfo}>Serie</span>
                    <p style={{ margin: "4px 8px" }}>{m.series}</p>
                  </li>
                </ul>

                <hr className={styles.divider} />

                <h2>Efeito da Carta</h2>
                <div>
                  <span>{m.maineffect}</span>
                </div>

                <hr className={styles.divider} />

                <h2>Efeito da Carta</h2>
                <div>
                  <span>{m.soureeffect}</span>
                </div>

                <hr className={styles.divider} />

                <h2>Nome do conjunto</h2>
                <div>
                  <span>{m.set_name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Back className={styles.btnBack} />
    </div>
  );
}
