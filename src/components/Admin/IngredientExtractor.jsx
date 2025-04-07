import React, { useState, useEffect } from 'react';
import { processAllRecipes, updateRecipeBaseIngredients } from '../../utils/ingredientExtractor';

const IngredientExtractor = () => {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [uniqueIngredients, setUniqueIngredients] = useState([]);
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    const [editedIngredients, setEditedIngredients] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState(new Set());

    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {
        try {
            const result = await processAllRecipes();
            setRecipes(result.recipes);
            setUniqueIngredients(result.uniqueIngredients);
            if (result.recipes.length > 0) {
                setEditedIngredients(result.recipes[0].baseIngredients);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error loading recipes:', error);
            setLoading(false);
        }
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...editedIngredients];
        newIngredients[index] = value;
        setEditedIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setEditedIngredients([...editedIngredients, '']);
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = editedIngredients.filter((_, i) => i !== index);
        setEditedIngredients(newIngredients);
    };

    const handleSave = async () => {
        const currentRecipe = recipes[currentRecipeIndex];
        try {
            await updateRecipeBaseIngredients(
                currentRecipe.id, 
                editedIngredients.filter(ing => ing.trim())
            );
            setSavedRecipes(new Set([...savedRecipes, currentRecipe.id]));
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    const handleNext = () => {
        if (currentRecipeIndex < recipes.length - 1) {
            setCurrentRecipeIndex(currentRecipeIndex + 1);
            setEditedIngredients(recipes[currentRecipeIndex + 1].baseIngredients);
        }
    };

    const handlePrevious = () => {
        if (currentRecipeIndex > 0) {
            setCurrentRecipeIndex(currentRecipeIndex - 1);
            setEditedIngredients(recipes[currentRecipeIndex - 1].baseIngredients);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const currentRecipe = recipes[currentRecipeIndex];
    const isSaved = savedRecipes.has(currentRecipe.id);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                    Recipe {currentRecipeIndex + 1} of {recipes.length}: {currentRecipe.name}
                </h2>
                
                {/* Original ingredients */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Original Ingredients:</h3>
                    <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
                        {currentRecipe.originalIngredients}
                    </pre>
                </div>

                {/* Extracted ingredients */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Base Ingredients:</h3>
                    <div className="space-y-2">
                        {editedIngredients.map((ingredient, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    className="flex-1 p-2 border rounded"
                                    list="ingredients-list"
                                />
                                <button
                                    onClick={() => handleRemoveIngredient(index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <datalist id="ingredients-list">
                            {uniqueIngredients.map((ingredient, index) => (
                                <option key={index} value={ingredient} />
                            ))}
                        </datalist>
                    </div>
                    <button
                        onClick={handleAddIngredient}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Add Ingredient
                    </button>
                </div>

                {/* Navigation and save buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePrevious}
                        disabled={currentRecipeIndex === 0}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className={`px-4 py-2 ${isSaved ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
                        >
                            {isSaved ? 'Saved' : 'Save'}
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentRecipeIndex === recipes.length - 1}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: `${(savedRecipes.size / recipes.length) * 100}%` }}
                    ></div>
                </div>
                <p className="text-center mt-2">
                    {savedRecipes.size} of {recipes.length} recipes processed
                </p>
            </div>
        </div>
    );
};

export default IngredientExtractor; 