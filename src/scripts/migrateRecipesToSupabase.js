// This script migrates recipe data from local JS files to Supabase
require('dotenv').config();

// Import Supabase client
const supabase = require('../lib/supabase');

// Import all the recipe data
const { Obiady } = require('../Data/recipes/obiady-data');
const { Zupy } = require('../Data/recipes/zupy-data');
const { Chleby } = require('../Data/recipes/chleby-data');
const { Smarowidla } = require('../Data/recipes/smarowidla-data');
const { Desery } = require('../Data/recipes/desery-data');
const { Babeczki } = require('../Data/recipes/babeczki-data');
const { Ciasta } = require('../Data/recipes/ciasta-data');
const { Ciastka } = require('../Data/recipes/ciastka-data');
const { Smoothie } = require('../Data/recipes/smoothie-data');
const { Inne } = require('../Data/recipes/inne-data');
const { Swieta } = require('../Data/recipes/swieta-data');
const { Snaki } = require('../Data/recipes/snaki-data');

// Define categories
const categories = [
  { name: 'OBIADY', display_name: 'Obiady', slug: 'obiady' },
  { name: 'ZUPY', display_name: 'Zupy', slug: 'zupy' },
  { name: 'CHLEBY', display_name: 'Chleby', slug: 'chleby' },
  { name: 'SMAROWIDŁA', display_name: 'Smarowidła', slug: 'smarowidla' },
  { name: 'DESERY', display_name: 'Desery', slug: 'desery' },
  { name: 'BABECZKI i MUFFINY', display_name: 'Babeczki i Muffiny', slug: 'babeczki-muffiny' },
  { name: 'CIASTA', display_name: 'Ciasta', slug: 'ciasta' },
  { name: 'CIASTKA', display_name: 'Ciastka', slug: 'ciastka' },
  { name: 'SMOOTHIE', display_name: 'Smoothie', slug: 'smoothie' },
  { name: 'INNE', display_name: 'Inne', slug: 'inne' },
  { name: 'ŚWIĘTA', display_name: 'Święta', slug: 'swieta' },
  { name: 'SNAKI', display_name: 'Snaki', slug: 'snaki' },
  { name: 'SAŁATKI i SURÓWKI', display_name: 'Sałatki i Surówki', slug: 'salatki-surowki' },
  { name: 'LUNCH', display_name: 'Lunch', slug: 'lunch' }
];

// Function to normalize recipe data
function normalizeRecipe(recipe) {
  const normalizedRecipe = {};
  
  // Normalize field names to lowercase to match database schema
  Object.keys(recipe).forEach(key => {
    const lowerKey = key.toLowerCase();
    normalizedRecipe[lowerKey] = recipe[key];
  });
  
  return normalizedRecipe;
}

// Combine all recipes into a single array and normalize them
const allRecipes = [
  ...Obiady,
  ...Zupy,
  ...Chleby,
  ...Smarowidla,
  ...Desery,
  ...Babeczki,
  ...Ciasta,
  ...Ciastka,
  ...Smoothie,
  ...Inne,
  ...Swieta,
  ...Snaki
].map(recipe => normalizeRecipe(recipe));

// Function to check and add categories if needed
async function checkAndAddCategories() {
  console.log('Checking categories...');

  try {
    // Check if categories table exists and has data
    const { data: existingCategories, error: fetchError } = await supabase
      .from('categories')
      .select('*');
      
    if (fetchError) {
      console.error('Error fetching categories:', fetchError);
      
      if (fetchError.code === '42P01') { // Table doesn't exist
        console.log('Categories table does not exist. Make sure to run the schema.sql file first.');
      } else if (fetchError.code === '42501') { // Permission error
        console.log('Permission error. Make sure to run the add_categories_policy.sql file.');
      }
      
      return false;
    }
    
    if (existingCategories && existingCategories.length > 0) {
      console.log(`Found ${existingCategories.length} existing categories.`);
      return true;
    }
    
    // If no categories exist, add them
    console.log('No categories found. Adding categories...');
    const { data, error } = await supabase
      .from('categories')
      .insert(categories);
      
    if (error) {
      console.error('Error adding categories:', error);
      return false;
    }
    
    console.log('Categories added successfully!');
    return true;
  } catch (err) {
    console.error('Exception when checking categories:', err);
    return false;
  }
}

// Function to insert recipes into Supabase
async function migrateRecipesToSupabase() {
  console.log(`Starting migration of ${allRecipes.length} recipes to Supabase...`);
  
  // First check categories
  const categoriesReady = await checkAndAddCategories();
  if (!categoriesReady) {
    console.log('Categories not ready. Please fix issues before migrating recipes.');
    return;
  }
  
  console.log(`Preparing to upsert ${allRecipes.length} recipes...`);
  
  // Insert recipes in batches to avoid potential limits or timeouts
  const BATCH_SIZE = 25;
  
  for (let i = 0; i < allRecipes.length; i += BATCH_SIZE) {
    const batch = allRecipes.slice(i, i + BATCH_SIZE);
    
    try {
      // Use upsert instead of insert to handle both insert and update
      const { data, error } = await supabase
        .from('recipes')
        .upsert(batch, { 
          onConflict: 'id',  // Handle conflicts on id
          ignoreDuplicates: false  // Update existing records
        });
      
      if (error) {
        console.error(`Error upserting batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
      } else {
        console.log(`Successfully upserted batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} recipes)`);
      }
    } catch (err) {
      console.error(`Exception when upserting batch ${Math.floor(i / BATCH_SIZE) + 1}:`, err);
    }
  }
  
  console.log('Migration completed!');
}

// Run the migration
migrateRecipesToSupabase();

// To run this script:
// 1. Create a Supabase project and get the URL and anon key
// 2. Set the environment variables REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY
// 3. Create a 'recipes' table in Supabase with the appropriate columns
// 4. Run this script with: node src/scripts/migrateRecipesToSupabase.js 