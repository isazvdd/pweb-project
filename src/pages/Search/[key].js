import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import { Button, Spin } from "antd";
import "antd/dist/reset.css";

import { Error } from "../../components/Error";
import { Fetcher } from "../../components/Fetcher";
import { Back } from "../../components/Back";
import styles from "../../styles/Key.module.css";

export default function Digimon() {
  const router = useRouter();
  const { key } = router.query;

  const { data, error } = useSWR(
    "https://digimoncard.io/api-public/search.php?n=" + key,
    Fetcher
  );

  return (
    <div>
      <Search
        data={
          error ? { error: "Erro na pesquisa" } : data ? data : { Search: "" }
        }
      />
    </div>
  );
}

export function Search({ data }) {
  if (data.Error) {
    return (
      <>
        <Error error={data.Error} />
        <Back className={styles.btnBack} />
      </>
    );
  }

  if (!data || data.Search === "") {
    return <Spin />;
  }

  return (
    <section className="container">
      <div className="row">
        <div className="col p-0 mt-3">
          <h2 className={styles.title}> Cartas encontradas:</h2>
          <div>
            <ul className={styles.searchResult}>
              {data.map((m) => (
                <il>
                  <img src={m.image_url} className={styles.image} />
                </il>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Back className={styles.btnBack} />
    </section>
  );
}
