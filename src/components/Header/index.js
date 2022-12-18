import styles from "../../styles/Header.module.css";

import { Space, Input } from "antd";

const { Search } = Input;

export function Header() {
  const onSearch = () => {
    document.getElementById("form-pesquisar").submit();
  };
  return (
    <header className={styles.header}>
      <span className={styles.logoHeader}>
        <a className={styles.logoHeader} href={"/"}>
          DigiCards
        </a>
      </span>
      <Space direction="horizontal" className={styles.container}>
        <form id="form-pesquisar" action="/Search/[key]">
          <Search
            name="key"
            placeholder="Pesquise por cartas"
            allowClear
            onSearch={onSearch}
            size="small"
          />
        </form>
      </Space>
    </header>
  );
}
