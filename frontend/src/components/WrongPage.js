import React, { Component } from 'react'
import NasaNav from "./Nav";

class WrongPage extends Component {
    render() {
        return (
          <div>
            <NasaNav />
            <br />
            <br />
            <br />
            Sorry This Page Doesn't Exist! Go back to the{" "}
            <a href="/">Main page</a>
          </div>
        );
    }
}

export default WrongPage
