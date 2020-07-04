import axios from "axios";

const FilmClient = {
  getFilms: (search) => axios.get(`films/?search=${search}`),
  getFilmDetail: (id) => axios.get(`films/${id}/`),
};

export default FilmClient;
