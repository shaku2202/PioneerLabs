const express = require('express');
const {connection}= require('./db');
const {userRouter}= require("./routes/user.routes");
const {listRouter}= require('./routes/list.routes');
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use('/users',userRouter);
app.use('/list',listRouter);

const options={
   definition:{
       openapi:"3.0.0",
       info:{
           title:"User Management System",
           version:"1.0.0"
       },
       servers:[
           {
               url:"http://localhost:4500"
           }
       ]
   },
   apis:["./routes/*.js"]
}

const openApiSpec=swaggerJsDoc(options);

app.use('/apidocs',swaggerUi.serve,swaggerUi.setup(openApiSpec));

app.get('/',(req,res)=>{
    res.send("hello")
})


// Fetch data from the public API
async function fetchData() {
   try {
       const apiUrl = 'https://api.publicapis.org/entries';
       const response = await axios.get(apiUrl);
       return response.data.entries;
   } catch (error) {
       console.error('Error fetching data:', error);
       throw new Error('Error fetching data from public API');
   }
}

app.get('/api/entries', async (req, res) => {
   try {
       
       let entries = await fetchData();

       // Filter by category
       const category = req.query.category;
       if (category) {
           entries = entries.filter(entry => entry.Category.toLowerCase() === category.toLowerCase());
       }

       // Sorting
       const sort = req.query.sort;
       if (sort === 'apiName') {
           entries.sort((a, b) => a.API.localeCompare(b.API));
       }

       // Pagination
       const page = parseInt(req.query.page) || 1;
       const limit = parseInt(req.query.limit) || 10;
       const startIndex = (page - 1) * limit;
       const endIndex = page * limit;
       const results = entries.slice(startIndex, endIndex);

       // Send response
       res.json({
           totalResults: entries.length,
           currentPage: page,
           entries: results
       });
   } catch (error) {
       console.error('Error:', error.message);
       res.status(500).json({ error: 'Internal server error' });
   }
});


//

app.listen(4500,async()=>{
 try{
    await connection,
    console.log("connected to DB");
    console.log("Server is runnig at the port 4500")
 }catch(err){
    console.log(err)
 }
})