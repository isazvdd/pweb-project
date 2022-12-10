import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import { Button, Spin } from "antd";
import "antd/dist/reset.css";

import { Error } from "../../components/Error";
import { Fetcher } from "../../components/Fetcher";
import { Back } from "../../components/Back";

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
        <Button style={{ display: "block", margin: "1rem auto" }}>
          <Back />
        </Button>
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
          <h2
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              background: "white",
              borderRadius: "5px",
              padding: "10px",
              color: "#1677ff",
            }}
          >
            {" "}
            Cartas encontradas:
          </h2>
          <div>
            <ul>
              {data.map((m) => (
                <il
                  style={{
                    display: "block",
                    margin: "1rem auto",
                  }}
                >
                  <img src={m.image_url} />
                </il>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Button style={{ display: "block", margin: "1rem auto" }}>
        <Back />
      </Button>
    </section>
  );
}
