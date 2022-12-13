import useSWR from "swr";

import { useRouter } from "next/router";
import { Spin } from "antd";

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

  return (
    <div className={styles.container}>
      {data.map((m) => (
        <div className={styles.column1}>
          <img
            src={`https://images.digimoncard.io/images/cards/${m.cardnumber}.jpg`}
            className={styles.image}
          />
          <div>
            <ul className={styles.listInformation}>
              <li>{m.name}</li>
              <li>{m.cardnumber}</li>
              <li>{m.color}</li>
              <li>{m.attribute}</li>
            </ul>
          </div>
        </div>
      ))}

      <Back className={styles.btnBack} />
    </div>
  );
}
