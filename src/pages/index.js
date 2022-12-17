import React from "react";
import { useState } from "react";
import useSWR from "swr";

import "antd/dist/reset.css";

import { FetcherSearch } from "../components/Fetcher";
import { Home } from "./Home";

export default function Index() {
  const [url, setUrl] = useState(
    "https://digimoncard.io/api-public/search.php?sort=name&sortdirection=asc&series=Digimon%20Card%20Game"
  );
  const { data, error } = useSWR(url, FetcherSearch);

  return (
    <div>
      <Home
        data={
          error ? { error: "Erro na pesquisa" } : data ? data : { Search: "" }
        }
        show={url !== ""}
      />
    </div>
  );
}
