import React from "react";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import FilmClient from "../clients/FilmClient";
import { Spinner, Row, Col } from "react-bootstrap";
import { Charecter, Planet, Starship, Species } from "./Utils";

class FilmDetail extends React.Component {
  state = {
    isFetching: false,
    data: null,
    error: ""
  };

  _fetchFilmDetails = () => {
    this.setState({
      isFetching: true,
      error: ""
    });
    return FilmClient.getFilmDetail(this.props.match.params.id)
      .then(res => {
        this.setState({
          isFetching: false,
          data: res.data
        });
      })
      .catch(() => {
        this.setState({
          isFetching: false,
          error: "something went wrong"
        });
      });
  };

  componentDidMount() {
    this._fetchFilmDetails();
  }
  render() {
    const { isFetching, data, error } = this.state;
    return (
      <Container style={{ paddingTop: "30px" }}>
        {isFetching ? (
          <Spinner style={{ margin: "10px" }} animation="grow" />
        ) : error ? (
          error
        ) : data && (
          
          <div>
            <Link to="/">Back to home</Link>
            <h2>{data.title}</h2>
            <ul>
                            <li>Director: {data.director}</li>
                            <li>Producer: {data.producer}</li>
                            <li>Release Date: {data.release_date}</li>
                          </ul>
            <Row>
            <Col>
              <h4>Charecters</h4>
              {
                data.characters.map(url => <Charecter url={url} key={url} />)
              }
            </Col>
            <Col>
              <h4>Planets</h4>
              {
                data.planets.map(url => <Planet url={url} key={url} />)
              }
            </Col>
            <Col>
              <h4>Starships</h4>
              {
                data.starships.map(url => <Starship url={url} key={url} />)
              }
            </Col>
            <Col>
            <h4>
              Species
            </h4>
            {
              data.species.map(url => <Species   url={url} key={url} />)
            }
            </Col>
            </Row>
          </div>
        )}
      </Container>
    );
  }
}
export default FilmDetail;
