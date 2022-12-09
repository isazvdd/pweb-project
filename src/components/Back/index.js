import { useRouter } from "next/router"

export function Back() {
    const router = useRouter();
    return <a onClick={() => router.back()}>Voltar</a>;
}