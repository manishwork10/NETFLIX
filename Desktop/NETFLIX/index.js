import express from "express"

const app= express();

// to make an app understand json 
app.use(express.json());
// routes
 app.get("/say-hello", (req, res) => {
    return res.status(200).send("Hello World");
})

// Object
const movieList= [];
app.post('/movie/add', (req, res) => {
    // extract new Movie from the req. body from the postman app
   movieList.push(req.body);
   return res.status(200).send({message: "Movie is added successfully.", movie: movieList})
})
// object showing into the list
app.get('/movie/list', (req, res) => {

    return res.status(200).send({message:"success",movie: movieList});
})


// network port and server 
const PORT = 8001;


app.listen(PORT, () => {

    console.log(`App is listening on port ${PORT}`);

    });