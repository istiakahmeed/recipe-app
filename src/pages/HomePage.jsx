import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

const ingredients = [
  "chicken",
  "rice",
  "beef",
  "potato",
  "tomato",
  "lettuce",
  "cheese",
  "carrot",
  "pasta",
  "bell pepper",
  "spinach",
  "apple",
  "banana",
  "orange",
  "strawberry",
  "egg",
  "milk",
];
const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`
      );
      const data = await res.json();
      setRecipes(data.hits);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionChange = (event) => {
    const { value, checked } = event.target;
    setSelectedItems((prevSelectedItems) =>
      checked
        ? [...prevSelectedItems, value]
        : prevSelectedItems.filter((item) => item !== value)
    );
  };
  useEffect(() => {
    if (selectedItems.length > 0) {
      selectedItems.forEach((item) => {
        fetchRecipes(item);
      });
    } else {
      fetchRecipes("Chiken");
    }
  }, [selectedItems]);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Recommended Recipes
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular choices
        </p>
        <h1 className="text-2xl font-bold mb-4">Select Ingredients</h1>
        <div className="flex flex-wrap gap-4 pb-5">
          {ingredients.map((ingredient) => (
            <label key={ingredient} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={ingredient}
                onChange={handleSelectionChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 capitalize">{ingredient}</span>
            </label>
          ))}
        </div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            recipes.map(({ recipe }, index) => (
              <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
