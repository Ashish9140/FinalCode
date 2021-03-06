import Sidebar from "components/sidebar/Sidebar";
import { connect } from "react-redux";
import React from "react";
import { withRouter } from "react-router-dom";
import Main from "Pages/User-main/Main";
import { getUser } from "actions";
import "./style-user.css";
import TransferMoney from "components/modals/TransferMoney";


class UserHomePage extends React.Component {
  state = { newUser: false }
  
  componentDidMount() {
    console.log("mounted");
    if (!this.props.userInfo.user && !localStorage.getItem("token")) {
      this.props.history.push("/signup");
    } else if (!this.props.userInfo.user && localStorage.getItem("token")) {
      this.props.getUser(localStorage.getItem("token"), this.props.history);
    } else if (this.props.userInfo.account) {
      if (this.props.userInfo.account.transactionHistory.length === 0 && !this.state.newUser) {
        this.setState({newUser : true})
      }
    }
  }

  componentDidUpdate() {
    if (this.props.userInfo.account) {
      if (this.props.userInfo.account.transactionHistory.length === 0 && !this.state.newUser) {
        this.setState({newUser : true})
      }
    }
  }
  renderPage = () => {
    if (
      !this.props.userInfo.user ||
      (this.props.userInfo.user && !this.props.userInfo.user.isAdmin)
    ) {
      return (
        <div id="user-home-page-wrapper">
          {this.state.newUser ? <TransferMoney /> : null}
          <Sidebar />
          <Main />
        </div>
      );
    } else {
      this.props.history.push("/admin");
      return <h4>LOADING</h4>
    }
  };
  render() {
    return this.renderPage();
  }
}
const mapStateToProps = (state) => {
  return { ...state };
};
export default connect(mapStateToProps, { getUser })(withRouter(UserHomePage));
