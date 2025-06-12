import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturedProducts from "../components/FeaturedProducts";
const AnimeCollection = () => {
    let [animeClothes, setAnimeClothes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4001/api/v4/getAllProducts");
                setAnimeClothes(response.data.animeClothes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="animeClothes navbarItemsContainer">
            <div className="navbarItemsSubContainer">
                {
                    <>
                        {animeClothes.map((v, i) => {
                            return <FeaturedProducts data={v} key={i} />;
                        })}
                    </>
                }
            </div>
        </div>
    );
};

export default AnimeCollection;
