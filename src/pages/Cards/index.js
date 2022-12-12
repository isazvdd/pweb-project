import useSWR from "swr";

import { useRouter } from "next/router";

import { Back } from "../../components/Back";
import { Error } from "../../components/Error";
import { Fetcher } from "../../components/Fetcher";

import { Button } from "antd";

export default function Cards() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(
    `https://digimoncard.io/api-public/search.php?card=${id}`,
    Fetcher
  );

  if (data.Error) {
    return <Error error={data.Error} />;
  }

  return (
    <div>
      <center>
        <div
          style={{
            backgroundColor: "rgb(57, 59, 60)",
            maxWidth: "600px",
            width: "85%",
            margin: "50px auto",
            padding: "20px",
            borderRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {data.map((m) => (
            <img
              src={m.image_url}
              style={{
                margin: "10px",
                width: "300px",
                borderRadius: "10px",
                border: "1px solid black",
              }}
            />
          ))}
        </div>
      </center>

      <h2>apareça pelo amor de deussss inferno</h2>

      <Back style={{ display: "block", margin: "1rem auto" }} />
    </div>
  );
}

{
  /* {data.id.map((m) => (
        <Link href={`/ID/${m.id}`}>{m.name}</Link>
      ))} */
}
