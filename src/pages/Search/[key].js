import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import { Spin, Table } from "antd";

import "antd/dist/reset.css";

import { Error } from "../../components/Error";
import { Fetcher } from "../../components/Fetcher";
import { Back } from "../../components/Back";
import { Header } from "../../components/Header";

import styles from "../../styles/Key.module.css";
import Link from "next/link";

const columns = [
  {
    title: 'Carta',
    dataIndex: 'image',
    render: (_, movie) => <Link href={"../Cards/" + movie.cardnumber}><img className={styles.imageTable} src={movie.image_url} /></Link>,
  },
  {
    title: 'Nome da carta',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'Número da carta',
    dataIndex: 'cardnumber',
    sorter: (a, b) => a.name.length - b.name.length
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Header />
      <section>

        <h2 className={styles.title}> Cartas encontradas:</h2>
        <div>
          <Table className={styles.tableResult} dataSource={dados} columns={columns} onChange={onChange} />
        </div>
        <Back className={styles.btnBack} />
      </section>
    </div>
  );
}
