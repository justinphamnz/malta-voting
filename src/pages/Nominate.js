import React, { Component } from "react";
import web3 from "../web3";
import MaltaVoting from "../smartContract/MaltaVoting";

export default class Nominate extends Component {
  constructor(props) {
    super(props);
    this.nominateCandidate = this.nominateCandidate.bind(this);
    this.candidateAddressOnChanged = this.candidateAddressOnChanged.bind(this);
    this.state = {
      userWalletAddress: "",
      candidateAddress: ""
    };
  }

  componentDidMount() {
    this.getUserWalletAddress();
  }

  getUserWalletAddress() {
    web3.eth.getAccounts().then(accounts => {
      if (accounts.length !== 0) {
        this.setState({
          userWalletAddress: accounts[0]
        });
      }
    });
  }

  candidateAddressOnChanged(e) {
    let candidateAddress = e.currentTarget.value;
    this.setState({
      candidateAddress: candidateAddress
    });
  }

  nominateCandidate() {
    MaltaVoting.methods
      .nominateCandidate(this.state.candidateAddress)
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
        <div className="ui segment nominate">
          <h3 className="ui center aligned header">
            <i className="icon user" />
            Nominate
          </h3>
          <form className="ui form nominate">
            <div className="ui field">
              <label>Name</label>
              <input
                type="text"
                name="candidateName"
                placeholder="Candidate Name"
              />
            </div>
            <div className="ui field">
              <label>Address</label>
              <input
                type="text"
                name="candidateAddress"
                placeholder="Candidate Address"
                onChange={this.candidateAddressOnChanged}
              />
            </div>
            <div className="ui field">
              <button
                className="ui primary basic button"
                type="button"
                onClick={this.nominateCandidate}
              >
                Nominate
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
