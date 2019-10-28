import { Router } from "@reach/router";
import React from "react";
import Home from "./components/Home";
import DetailRecette from "./components/Recettes/DetailRecette";
import "materialize-css/dist/css/materialize.min.css";
import Header from "./components/Header";
import ListeCourses from "./components/Courses/ListeCourses"
import DetailCourse from "./components/Courses/DetailCourse";
const App = () => {
  return (
      <div>
        <Header />
        <Router>
          <Home path="/" />
          <DetailRecette path="recette/:id" />
          <ListeCourses path="/courses" />
          <DetailCourse path="/courses/:id" />
        </Router>
      </div>
  );
};
export default App;
