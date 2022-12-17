import { Button } from "antd";
import { useRouter } from "next/router";

export function Back() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      style={{
        display: "flex",
        alignItens: "center",
        justifyContent: "center",
        margin: "1rem auto",
      }}
    >
      Voltar
    </Button>
  );
}
