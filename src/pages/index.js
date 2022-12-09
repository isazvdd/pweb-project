import useSWR from "swr";

import { FetcherSearch } from "../components/Fetcher";

import { useState } from "react";
import { Input, Space, Typography, Spin, Table } from "antd";
import "antd/dist/reset.css";
import Link from "next/link";

import React from "react";

const { Search } = Input;

const columns = [
  {
    title: 'Título',
    dataIndex: 'name',
    render: (_, cards) => <a href={"id/" + cards.id}>{cards.name}</a>,
  },
  {
    title: 'Número da carta',
    dataIndex: 'cardnumber',
  },
]
  ;

export default function Index() {
  const [url, setUrl] = useState(
    "https://digimoncard.io/api-public/getAllCards.php?sort=name&series=Digimon Card Game&sortdirection=asc"
  );
  const { data, error } = useSWR(url, FetcherSearch);

  const onClickHandler = (e) => {
    e.preventDefault();
    if (url === "")
      setUrl(
        "https://digimoncard.io/api-public/getAllCards.php?sort=name&series=Digimon Card Game&sortdirection=asc"
      );
    else setUrl("");
  };

  return (
    <div>
      <TheDigimon
        data={
          error ? { error: "Erro na pesquisa" } : data ? data : { Search: "" }
        }
        show={url !== ""}
      />
    </div>
  );
}

export function TheDigimon({ data, show }) {
  if (!show) return <div></div>;

  if (data.Error) {
    return <Error error={data.Error} />;
  }

  if (data.Search === "") {
    return <Spin />;
  }

  const onSearch = () => {
    document.getElementById("form-pesquisar").submit();
  };

  let dados = data.map((m) => {
    return {
      ...m,
      key: m.id
    };
  })

  return (
    <div>
      <div className="space-align-block">
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <form
            action="/Search/[key]"
            id="form-pesquisar"
            style={{ marginBottom: "10px" }}
          >
            <Search
              name="key"
              placeholder="Pesquise por cartas"
              allowClear
              enterButton="Pesquisar"
              onSearch={onSearch}
              size="small"
            />
          </form>
        </Space>
      </div>
      <section className="container">
        <h2>
          {" "}
          Músicas encontradas:
        </h2>
        <div>
          <Table dataSource={dados} columns={columns} />
        </div>
      </section >
    </div>
  );
}

