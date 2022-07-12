import { useRouter } from "next/router";

const Reader = ({ car }) => {
    const router = useRouter();
    const { uri } = router.query;

    return (
        <>
            <h1>Read this uri: {uri}</h1>
        </>
    );
};

// ran by next at build time.
// return value is passed to Car component
export const getStaticProps = async ({ params }) => {
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: { car: data },
    };
};

// for dynamic routes, we must let next know how many
// and which subpages to render
//
// export const getStaticPaths = async () => {
//     const req = await fetch("http://localhost:3000/cars.json");
//     const data = await req.json();

//     const paths = data.map((car) => {
//         return { params: { id: car } };
//     });
//     return { paths, fallback: false };
// };

export default Reader;
