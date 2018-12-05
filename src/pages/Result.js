import React, { Component } from "react";
import { Progress } from "semantic-ui-react";
import MaltaVoting from "../smartContract/MaltaVoting";
export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    };
  }

  componentDidMount() {
    this.getCandidates();
  }

  getNumberOfCandidates() {
    return new Promise((resolve, reject) => {
      MaltaVoting.methods
        .numberOfCandidates()
        .call()
        .then(result => {
          resolve(result);
        });
    });
  }

  getCandidates() {
    this.getNumberOfCandidates().then(result => {
      for (let index = 0; index < result; index++) {
        MaltaVoting.methods
          .candidates(index)
          .call()
          .then(candidateResult => {
            let candidate = {
              candidate: candidateResult.candidateAddress,
              votes: candidateResult.votes
            };

            this.setState({
              candidates: this.state.candidates.concat(candidate)
            });

            console.log(this.state.candidates);
          });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="ui segment result">
          <h3 className="ui center aligned header">
            <i className="icon user" />
            Result
          </h3>
          <div className="ui items result">
            <label>This is a result of</label>
            {this.state.candidates.map((item, index) => {
              return (
                <div className="ui item">
                  <div className="ui tiny image">
                    <img
                      alt=""
                      className="left floated tiny ui image"
                      src="https://semantic-ui.com/images/avatar2/large/matthew.png"
                    />
                  </div>
                  <div className="content">
                    <label className="candidate name">{item.candidate}</label>
                    <p className="votes count">{item.votes} votes</p>
                    <Progress
                      progress="value"
                      value={item.votes}
                      color="blue"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
