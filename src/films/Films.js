import React from "react";
import {
  Container,
  FormControl,
  InputGroup,
  Spinner,
  Alert,
  OverlayTrigger,
  Tooltip,
  Button
} from "react-bootstrap";
import FilmClient from "../clients/FilmClient";
import { Link } from "react-router-dom";

class Films extends React.Component {
  state = {
    search: "",
    isFetching: false,
    fav: [],
    unfav: [],
    error: ""
  };

  _fetchFilms = search => {
    this.setState({
      isFetching: true,
      error: ""
    });
    return FilmClient.getFilms(search)
      .then(res => {
        this._films = res.data.results;
        const fav = [];
        const unfav = [];
        this._films.forEach(film => {
          localStorage.getItem(`film:favourate:${film.url}`) ? fav.push(film) : unfav.push(film);
        });
        console.log(fav, unfav);
        this.setState({
          isFetching: false,
          fav: fav,
          unfav: unfav
        });
      })
      .catch(() => {
        this.setState({
          isFetching: false,
          error: "something went wrong"
        });
      });
  };

  _favourateIt = key => {
    localStorage.setItem(`film:favourate:${key}`, true);
    const film = this._films.find(film => film.url === key);
    this.setState(state => ({
      fav: state.fav.concat(film),
      unfav: state.unfav.filter(film => film.url !== key)
    }))
  }
  
  _unfavourateIt = key => {
    localStorage.removeItem(`film:favourate:${key}`);
    const film = this._films.find(film => film.url === key);
    this.setState(state => ({
      fav: state.fav.filter(film => film.url !== key),
      unfav: state.unfav.concat(film),
    }))
  }

  componentDidMount() {
    this._fetchFilms(this.state.search);
  }

  componentDidUpdate(pp, ps) {
    if (this.state.search !== ps.search) {
      this._fetchFilms(this.state.search);
    }
  }

  render() {
    const { search, isFetching, fav, unfav, error } = this.state;

    return (
      <Container>
        <h1 style={{ marginTop: "30px" }}>Films</h1>
        <InputGroup size="lg">
          <FormControl
            aria-label="search"
            aria-describedby="inputGroup-sizing-sm"
            value={search}
            onChange={e => this.setState({ search: e.target.value })}
            placeholder="Search film name.. "
          />
        </InputGroup>
        <div style={{ marginTop: "10px" }}>
          {isFetching ? (
            <Spinner style={{ margin: "10px" }} animation="grow" />
          ) : error ? (
            error
          ) : (
            <div>
              <div>
            {
              fav.map(film => (
                <div key={film.url}>
                  <Alert variant="primary">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'baseline'}}>
                    <OverlayTrigger
                      placement="right-start"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id={"tt" + film.url}>
                          <ul>
                            <li>Director: {film.director}</li>
                            <li>Producer: {film.producer}</li>
                            <li>Release Date: {film.release_date}</li>
                          </ul>
                        </Tooltip>
                      }
                    >
                      <Link to={`/film-detail/${film.url.slice(-2).slice(0, 1)}`}>
                        {film.title}
                      </Link>
                    </OverlayTrigger>
                      <Button variant="secondary" onClick={() => this._unfavourateIt(film.url)}>Un Favourate it</Button>
                      </div>
                  </Alert>
                </div>
              ))
            }
            </div>
            <div>
            {
              unfav.map(film => (
                <div key={film.url}>
                  <Alert variant="light">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'baseline'}}>
                    <OverlayTrigger
                      placement="right-start"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id={"tt" + film.url}>
                          <ul>
                            <li>Director: {film.director}</li>
                            <li>Producer: {film.producer}</li>
                            <li>Release Date: {film.release_date}</li>
                          </ul>
                        </Tooltip>
                      }
                    >
                      <Link to={`/film-detail/${film.url.slice(-2).slice(0, 1)}`}>
                        {film.title}
                      </Link>
                    </OverlayTrigger>
                      <Button variant="primary" onClick={() => this._favourateIt(film.url)}>Favourate it</Button>
                      </div>
                  </Alert>
                </div>
              ))
            }
            </div>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default Films;
