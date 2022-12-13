import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import { Spin, Table } from "antd";
import "antd/dist/reset.css";

import { Error } from "../../components/Error";
import { Fetcher } from "../../components/Fetcher";
import { Back } from "../../components/Back";

import styles from "../../styles/Key.module.css";

const columns = [
  {
    title: 'Carta',
    dataIndex: 'image',
    render: (_, movie) => <a href={"../Cards/" + movie.cardnumber}><img className={styles.imageTable} src={movie.image_url} /></a>,
  },
  {
    title: 'Nome da carta',
    dataIndex: 'name',
  },
  {
    title: 'Número da carta',
    dataIndex: 'cardnumber',
  },
];

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

  let dados = Array.isArray(data) ? data.map((m) => {
    return {
      ...m,
      key: m.cardnumber
    };
  }) : () => {
    data.image_url = <a href={"../Cards/" + m.cardnumber}><img src={m.image_url} /></a>;
    return {
      ...data,
      key: data.cardnumber
    }
  }

  return (
    <section className="container">
      <div className="row">
        <div className="col p-0 mt-3">
          <h2 className={styles.title}> Cartas encontradas:</h2>
          <div>
            <Table className={styles.tableResult} dataSource={dados} columns={columns} />
          </div>
        </div>
      </div>
      <Back className={styles.btnBack} />
    </section>
  );
}
