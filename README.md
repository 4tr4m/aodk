# Kuchni Recipe App

This project is a recipe application that stores and displays various recipes.

## Setting Up Supabase

This application uses Supabase as a backend database. Follow these steps to set up your Supabase project:

1. Create an account at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Project Settings > API and copy your URL and anon key
4. Create a `.env` file in the root directory of the project based on `.env.example`
5. Add your Supabase URL and anon key to the `.env` file:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-project-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Setting Up the Database

1. Go to your Supabase project's SQL Editor
2. Create the necessary tables by running the SQL queries in `database/schema.sql`

### Migrating Recipes to Supabase

To migrate your recipe data from JavaScript files to Supabase:

1. Make sure your `.env` file is properly configured
2. Install the required dependencies:
   ```
   npm install @supabase/supabase-js esm
   ```
3. Run the migration script:
   ```
   npx esm src/scripts/migrateRecipesToSupabase.js
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Project Structure

- `src/Data/recipes/` - Contains the local JavaScript recipe data files
- `src/lib/supabase.js` - Supabase client configuration
- `src/services/recipeService.js` - Service for interacting with recipe data in Supabase
- `src/scripts/migrateRecipesToSupabase.js` - Script to migrate recipe data to Supabase
- `database/schema.sql` - SQL schema for Supabase tables

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn about Supabase, check out the [Supabase documentation](https://supabase.com/docs).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
