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

// ? edit movie
app.put('/movie/edit/:movieId', (req, res) => {
    // extract movie id from req.params
    const movieId = Number(req.params.movieId);
  
    // find movie in movie list using movieId
    const requiredMovie = movieList.find((item, index, self) => {
      if (item.id === movieId) {
        return item;
      }
    });
  
    // if not movie, throw error
    if (!requiredMovie) {
      return res.status(404).send({ message: 'Movie does not exist.' });
    }
  
    // extract new values from req.body
    const newValues = req.body;
  
    const newMovieList = movieList.map((item, index, self) => {
      if (item.id === movieId) {
        return {
          id: movieId,
          name: newValues.name,
          releaseYear: newValues.releaseYear,
        };
      } else {
        return item;
      }
    });
  
    movieList = structuredClone(newMovieList);
  
    return res.status(200).send({ message: 'Movie is updated successfully.' });
  });
//! Delete the movies 

app.delete("/movie/delete", (req, res)=>{
  const movieToDeleted= req.body.name;
  const requiredMovie = movieList.find((item)=> 
  {
    if (item.name=== movieToDeleted)
      return item
  })
  if(!requiredMovie)
    return res.status(404).send({ message: "Movie doesn't exist"});
 

const nenMovieList = movieList.filter((item, index, array) => {
  if (item.name !== movieToDeleted) {
    return item;
  }
});
movieList= structuredClone(nenMovieList)
return res.status(200).send({ message: "Movies is deleted successfully."})
})

// network port and server 
const PORT = 8001;


app.listen(PORT, () => {

    console.log(`App is listening on port ${PORT}`);

    });