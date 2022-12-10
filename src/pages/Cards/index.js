import useSWR from "swr";

import { useRouter } from "next/router";

import { Back } from "../../components/Back";
import { Error } from "../../components/Error";
import { Fetcher } from "../../components/Fetcher";

export default function Cards() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR();
  `https://digimoncard.io/api-public/search.php?n=${id.name}&color=${id.color}&type=${id.type}&attribute=${id.attribute}&card=BT1-010&pack=${id.card_sets}&sort=name&sortdirection=desc&series=Digimon Card Game`,
    Fetcher;

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
    <div>
      {data.Search.map((m) => (
        <Link href={`/ID/${m.id}`}>{m.name}</Link>
      ))}

      <Button style={{ display: "block", margin: "1rem auto" }}>
        <GoBack />
      </Button>
    </div>
  );
}
