// import useSWR from "swr";

// import { useRouter } from "next/router";
// import { Spin, Typography } from "antd";
// import { Button } from "antd";

// import { Error } from "../../components/Error";
// import { Fetcher } from "../../components/Fetcher";
// import { Back } from "../../components/Back"

// export default function Musics() {
//   const router = useRouter();
//   const { imdbID } = router.query;

//   const { data, error } = useSWR(
//     `https://digimoncard.io/api-public/getAllCards.php?sort=name&series=Digimon Card Game&sortdirection=asc`,
//     Fetcher
//   );

//   if (error) {
//     return (
//       <>
//         <Error error={error} />
//         <Back />
//       </>
//     );
//   }

//   if (!data || data.Search === "") {
//     return <Spin />;
//   }

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <center>
//         <div
//           style={{
//             background: "white",
//             maxWidth: "600px",
//             width: "85%",
//             margin: "50px auto",
//             padding: "20px",
//             borderRadius: "10px",
//             textAlign: "center",
//           }}
//         >
//           <img src={data.Poster}></img>
//           <br />
//           <Typography.Title level={1} style={{ margin: 10 }}>
//             {data.Title} --- {data.Year}
//           </Typography.Title>
//           <Typography.Title level={5} style={{ margin: 10 }}>
//             {data.Plot}
//           </Typography.Title>
//         </div>
//         <Button style={{ display: "block", margin: "1rem auto" }}>
//           <Back />
//         </Button>
//       </center>
//     </div>
//   );
// }
