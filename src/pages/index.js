import useSWR from "swr";

import { useState } from "react";
import { Input, Space, Typography, Spin } from "antd";
import "antd/dist/reset.css";
import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";
import { Button, Popover } from "antd";

const { Search } = Input;

export default function Index() {
  const [url, setUrl] = useState(
    "http://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=e40e5d1c2779cb5d11f90299890b38ac&format=json"
  );
  const { data, error } = useSWR(url, theFetcher);

  const onClickHandler = (e) => {
    e.preventDefault();
    if (url === "")
      setUrl(
        "http://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=e40e5d1c2779cb5d11f90299890b38ac&format=json"
      );
    else setUrl("");
  };

<<<<<<< HEAD
  return (
    <div>
      <TheLink url={url} handler={onClickHandler} />
      <TheMusics
        data={
          error ? { error: "Erro na pesquisa" } : data ? data : { Search: "" }
        }
        show={url !== ""}
      />
    </div>
  );
=======
    return (
        <div>
            <TheMusics data={error ? { error: 'Erro na pesquisa' } : data ? data : { Search: '' }} show={url !== ''} />
        </div>
    )
>>>>>>> 634e561 (Connected to API LastFM)
}

async function theFetcher(url) {
  if (url === null || url === "") return { Search: "" };

  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export function TheMusics({ data, show }) {
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

  return (
    <div
      className="space-align-container"
      style={{
        background: "white",
        maxWidth: "500px",
        width: "85%",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <div className="space-align-block">
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <form
            action="/searchmovie/[key]"
            id="form-pesquisar"
            style={{ marginBottom: "10px" }}
          >
            <Search
              name="key"
              placeholder="Pesquise por filmes"
              allowClear
              enterButton="Pesquisar"
              onSearch={onSearch}
              size="small"
            />
          </form>
        </Space>
      </div>
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
              Filmes encontrados:
            </h2>
            <div>
              {data.Search.map((m) => (
                <Popover
                  content={(content) => {
                    return (content = <img src={m.Poster}></img>);
                  }}
                  placement="right"
                  trigger="hover"
                >
                  <Button style={{ display: "block", margin: "1rem auto" }}>
                    <Link href={`/music/${m.imdbID}`}>
                      {m.Title} ({m.Year})
                    </Link>
                  </Button>
                </Popover>
              ))}
            </div>
<<<<<<< HEAD
          </div>
        </div>
      </section>
    </div>
  );
}

export function TheLink({ url, handler }) {
  return (
    <div>
      <a href="/movies.js" onClick={handler}>
        {" "}
        {url === "" ? "Mostrar" : "Ocultar"}{" "}
      </a>
    </div>
  );
}

=======
            <section className='container'>
                <div className='row'>
                    <div className='col p-0 mt-3'>
                        <h2 style={{ display: "flex", width: "100%", justifyContent: "center", background: "white", borderRadius: "5px", padding: "10px", color: "#1677ff" }} > Filmes encontrados:</h2>
                        <div>
                            <ul>
                                {data.results.albummatches.album.map((m) => (
                                    <il style={{ display: "block", margin: "1rem auto" }}><Link href={`/onemovie/${m.imdbID}`}>
                                        {m.name} --- {m.artist}
                                    </Link></il>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

>>>>>>> 634e561 (Connected to API LastFM)
export function GoBack() {
  const router = useRouter();
  return <a onClick={() => router.back()}>Voltar</a>;
}

export function Error({ error }) {
  return (
    <Typography.Title level={1} style={{ margin: 10 }}>
      {error}
    </Typography.Title>
  );
}
