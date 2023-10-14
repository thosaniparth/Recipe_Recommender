import React, { useEffect } from 'react';
import './Home.css'

import recipeDB from '../../apis/recipeDB';

const Home = () => {
    const fetchAllRecipe = async (dict) => {
        const response = await recipeDB
          .get("/recipes")
          .catch((err) => {
            console.log(err, err.message);
          });
        if (response) {
          console.log(response.data)
        } else {
          console.log("Failed...")
        }
      };

    useEffect(() => {
        fetchAllRecipe();
    }, []);
    
    return (
        <div>
            Home
        </div>
    );
};

export default Home;