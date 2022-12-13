import { Input, Space, Spin } from "antd";
import Link from "next/link";

import { Error } from "../../components/Error";
import styles from "../../styles/Home.module.css";

const { Search } = Input;

export function Home({ data, show }) {
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
    <div>
      <div className="space-align-block">
        <Space direction="horizontal" className={styles.container}>
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
      <section>
        <h2> Todas as cartas:</h2>
        <div className={styles.allCards}>
          {data.map((m) => (
            <Link href={`../Card/${m.cardnumber}`} target="_blank">
              <img src={m.image_url} className={styles.images} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
