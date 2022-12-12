import { Input, Space, Spin } from "antd";
import Link from "next/link";

import { Error } from "../../components/Error";

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
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "end", padding: "20px" }}
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
      <section>
        <h2> Todas as cartas:</h2>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            textAlign: "center",
            gap: "14px",
          }}
        >
          {data.map((m) => (
            <Link href={`../Card/${m.cardnumber}`}>
              <img
                src={m.image_url}
                style={{
                  margin: "10px",
                  width: "300px",
                  borderRadius: "10px",
                  border: "1px solid black",
                }}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
