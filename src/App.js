import { Router } from "@reach/router";
import React from "react";
import DetailRecette from "./components/Recettes/DetailRecette";
import "materialize-css/dist/css/materialize.min.css";
import Header from "./components/Header";
import ListeCourses from "./components/Courses/ListeCourses"
import DetailCourse from "./components/Courses/DetailCourse";
import ListeRecettes from "./components/Recettes/ListeRecettes";
import Refrigerecette from "./components/Refrigerecette/Refrigerecette";
const App = () => {
  return (
      <div>
        <Header />
        <Router>
          <ListeRecettes path="/" />
          <DetailRecette path="recette/:id" />
          <ListeCourses path="/courses" />
          <DetailCourse path="/courses/:id" />
          <Refrigerecette path="/refrigerecette" />
        </Router>
      </div>
  );
};
export default App;
