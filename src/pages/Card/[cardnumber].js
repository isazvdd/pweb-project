import useSWR from "swr";

import { useRouter } from "next/router";
import { Spin } from "antd";

import { Back } from "../../components/Back";
import { Error } from "../../components/Error";
import { FetcherSearch } from "../../components/Fetcher";
import { useState } from "react";

export default function Card() {
  const router = useRouter();
  const { cardnumber } = router.query;

  const { data, error } = useSWR(`https://digimoncard.io/api-public/search.php?card=${cardnumber}`, fetcher)

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
    <div style={{ marginTop: "20px" }}>
      <center>
        <div
          style={{
            background: "white",
            maxWidth: "600px",
            width: "85%",
            margin: "50px auto",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
        </div>
        <ul>
          {data.map((m) => (
            <p>{m.name} --- {m.color}</p>

          ))}
          <Back style={{ display: "block", margin: "1rem auto" }} />
        </ul>
      </center>
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}