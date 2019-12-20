import React,{useState, useEffect} from "react";
import axios from "axios";
// import {Movie} from "./Movie";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
}


const UpdateMovie = props => {
    const [updateMovie, setUpdateMovie]=useState(initialMovie)
console.log(updateMovie)

    const id = props.match.params.id
 

    const handleStars = e => {
        e.preventDefault()
        setUpdateMovie({...updateMovie, stars: e.target.value.split(" ")})
    }


  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        console.log(res.data)
        setUpdateMovie(res.data)
    })
    .catch(err => console.log(err))
}, [id])


 const handleChanges = e => {
    setUpdateMovie({...updateMovie, [e.target.name]: e.target.value})
}

const handleSubmit = e => {
    e.preventDefault();
    console.log('botton fired!')
    axios
    .put(`http://localhost:5000/api/movies/${updateMovie.id}`, updateMovie)
    .then(res => {
        console.log(res.data)
        setUpdateMovie(res.data)
        props.history.push(`/movies/${updateMovie.id}`)
    })
}



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                onChange={handleChanges}
                placeholder="Title"
                value={updateMovie.title}  
                />
                <input
                type="text"
                name="director"
                onChange={handleChanges}
                placeholder="Director"
                value={updateMovie.director}
                />
                <input
                type="text"
                name="metascore"
                onChange={handleChanges}
                placeholder="MetaScore"
                value={updateMovie.metascore}
                />
                <input
                type="string"
                name="stars"
                onChange={handleStars}
                placeholder="Stars"
                value={updateMovie.stars}
                />
                <button type="submit">Update Movie</button>
                
            </form>
         
            
        </div>
    )
}

export default UpdateMovie;