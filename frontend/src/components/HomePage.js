import React, { Component } from "react";
import axios from "axios";
import first from "./first_image.jpg";
import second from "./25689_PIA24487-web.jpg";
import third from "./25699_PIA24482-800.jpg";
import fourth from "./nasa-mars-940x550.jpg";
import "./loader.css";
import SingleHomePage from "./SingleHomePage/singleHomePage";
import NasaNav from "./Nav";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      searchTerm: "",
      loading: false,
      isHomePage: true,
    };
  }

  componentDidMount() {
    document.title = "MohamedFm | Home";
    
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=RDjAmaAvEeRa5ibvhXKqhcqoUJQjishbP2shAuzF&count=9"
      )
      .then((response) => {
        this.setState({ posts: response.data, loading: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { posts, searchTerm, loading, isHomePage } = this.state;
    return (
      <div>
        <NasaNav
          home="active"
          isHomePage={isHomePage}
          filterText={(event) => {
            this.setState({ searchTerm: event.target.value });
          }}
        />
        <div>
          <br />
          {loading ? (
              <SingleHomePage
                posts={posts}
                searchTerm={searchTerm}
                first={first}
                second={second}
                third={third}
                fourth={fourth}
              />
          ) : (
            <div className="loader"></div>
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
