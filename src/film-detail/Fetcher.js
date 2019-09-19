import React from "react";
import Axios from "axios";
import { Spinner } from "react-bootstrap";

class Fetcher extends React.Component {
  state = {
    isFetching: false,
    data: null
  };

  _fetchData = () => {
    this.setState({
      isFetching: true
    });
    return Axios.get(this.props.url)
      .then(res => {
        this.setState({
          isFetching: false,
          data: res.data
        });
      })
      .catch(() => {
        this.setState({
          isFetching: false
        });
      });
  };

  componentDidMount() {
    this._fetchData();
  }

  render() {
    const { attributes } = this.props;
    const { isFetching, data } = this.state;
    return (
      <div style={{padding: '5px'}}>
        {isFetching ? (
          <Spinner style={{ margin: "10px" }} animation="grow" />
        ) : (
          data && (
            <div>
              <h5>{data.name}</h5>
              <ul>
                {
                  attributes.map(attribute => <li key={attribute}>{attribute} : {data[attribute]}</li>)
                }
              </ul>
            </div>
          )
        )}
      </div>
    );
  }
}

export default Fetcher;
