import React, { Component } from "react";
import MaltaVoting from "../smartContract/MaltaVoting";
import web3 from "../web3";

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.onCheckBoxClicked = this.onCheckBoxClicked.bind(this);
    this.vote = this.vote.bind(this);
    this.state = {
      candidates: [],
      selectedCandidate: "",
      userWalletAddress: ""
    };
  }

  componentDidMount() {
    this.getCandidates();
    this.getCurrentUserWallet();
  }

  onCheckBoxClicked(e) {
    this.setState({
      selectedCandidate: e.currentTarget.value
    });
  }

  getCurrentUserWallet() {
    web3.eth.getAccounts().then(accounts => {
      if (accounts.length !== 0) {
        this.setState({
          userWalletAddress: accounts[0]
        });
      }
    });
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

  vote() {
    MaltaVoting.methods
      .vote(this.state.selectedCandidate)
      .send({
        from: this.state.userWalletAddress
      })
      .then(result => {
        console.log(result);
      });
  }

  render() {
    return (
      <div>
        <div className="ui segment vote">
          <h3 className="ui left aligned header">
            <i className="th list icon" />
            Vote
          </h3>
          <form className="ui fom vote">
            <div className="grouped fields">
              <label>Check the candidate you want to vote</label>

              {this.state.candidates.map((candidate, index) => {
                console.log(candidate);
                return (
                  <div className="field">
                    <div className="ui checkbox">
                      <input
                        type="checkbox"
                        value={index}
                        name="candidateAddress"
                        onClick={this.onCheckBoxClicked}
                      />
                      <label>{candidate.candidate}</label>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="inline fields">
              <button
                type="button"
                className="ui primary basic button"
                onClick={this.vote}
              >
                Vote
              </button>
              <a className="ui green basic button" href="dapp/result">
                View Result
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
