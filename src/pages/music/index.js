import useSWR from "swr";

import { useRouter } from "next/router";
import { Error, GoBack } from "..";
import { Spin, Typography } from "antd";
import { Button } from "antd";

export default function Musics() {
  const router = useRouter();
  const { imdbID } = router.query;

  const { data, error } = useSWR(
    `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${imdbID}&api_key=e40e5d1c2779cb5d11f90299890b38ac&format=json`,
    fetcher
  );

  if (error) {
    return (
      <>
        <Error error={error} />
        <GoBack />
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
          <img src={data.Poster}></img>
          <br />
          <Typography.Title level={1} style={{ margin: 10 }}>
            {data.Title} --- {data.Year}
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 10 }}>
            {data.Plot}
          </Typography.Title>
        </div>
        <Button style={{ display: "block", margin: "1rem auto" }}>
          <GoBack />
        </Button>
      </center>
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);

  const json = await res.json();

  return json;
}
