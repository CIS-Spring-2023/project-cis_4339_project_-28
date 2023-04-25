# Data Platform Frontend

This project uses [VueJS 3](https://vuejs.org/) with [Vite](https://vitejs.dev/) and [TailwindCSS](https://tailwindcss.com/).
For form validation [Vuelidate](https://vuelidate-next.netlify.app/) is used.

## Project setup

    npm install

### Before startup
You need to either have a local backend running and or use a cloud deployed backend.

Setup a .env file with following variables, e.g.:

    VITE_ROOT_API=http://localhost:3000

VITE_ROOT_API is the URL for the backend API, either on localhost or in the cloud.
### Compiles and hot-reloads for development

    npm run dev


### @wakindo - Add my frontend references here
**********************************************************************************
-List my references here as I go thru the code
1) Dr Lindner CIS 4339 Lectures and in class source code samples
2) Front-End Development Projects with Vue.js" by Raymond Camden,
Hugo Di Francesco, Clifford Gurney, Philip Kirkbride and Maya
Shavin, Packt Publishing (November, 2020)
3) https://www.geeksforgeeks.org/
4) https://v2.vuejs.org/




*********************************************************************************
NB: Make sure I am on the right folder before executing:
- Project setup above i.e. "cd frontend" ,  "npm install" and then "npm run dev"
- after above verif, I can run "npm run dev" after code to see changes
- DO NOT FORGET to:
    * remove nav menu item "add service" from main MENU on the left
    * update nav menu items in "App.vue" everytime I add a new feature
### @wakindo - ToDo List
- Think about navigation schema with teammate on Sunday
- Have my viewpoint ready
- * Continue with "add service" form and see how it should go with Prof. Lindner
- last commit for today: 20230420


#### DO NOT FORGET TO ADD AT LEAST ONE ORG(with default name set on .env file) TO DB TO PREVENT ERROR ON APP.VUE
db.org.insertOne(
{
    name: "LocalOrg"
});

# install latest version of tailwind to avoid autoprefix error
    npm install autoprefixer@latest --save-exact
    or 
    npm install autoprefixer@10.4.5 --save-exact

<<<<<<< HEAD
- David Bonilla - Dropped the class
=======
- Hello

### Lior - Services Documentation 
**Create Services** 
On the sidebar will link you to the Create Services tab. Inside of the Create Services tab there is a textbox where you enter the name of the service, add a description, and set the status of the service.
Once data is inputed select the "Create Service" Button and it will store the data.

**Services List** 
The Services List tab will show a table with all current services. You can edit or delete services by clicking the buttons.
- **Edit:** This will place the data into the text boxes allowing for the user to edit. Click the "Update" button to save the changes.
- **Change Status:** This will serve as a quick toggle to make a service "Active" or "Inactive".
- **Delete:** Completely deletes the service.


>>>>>>> b55d5b968ecf0d2d8514b69e2020dd115217fb2e


**Editor**
editor
password

**Viewer**
viewer
viewerpassword