const { ListCollectionsCursor } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    name: String,
    ingredients: Array,
    instructions: Array,
    categories: Array
});


/*
In the Recipes-collection, add a new attribute called categories.
This attribute should have a list of ObjectIDs that refer
to categories that are related to the recipe.
When user click at least one of the special diets and then submits,
the _ids should be saved as a list to the Recipes-collection.
*/
module.exports = mongoose.model("Recipe", recipeSchema);
