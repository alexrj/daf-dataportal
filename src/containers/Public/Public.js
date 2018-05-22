import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../views/Public/Home/Home';
import Missione from '../../views/Public/Missione/Missione';
import Header from '../../components/Header/Public/Header'
import Footer from '../../components/Footer/Public/Footer'
import UserStory from '../../views/UserStory/UserStory'
import Team from '../../views/Public/Team/Team';
import Guida from '../../views/Public/Guida/Guida';
import Partecipa from '../../views/Public/Partecipa/Partecipa';
import DatasetList from '../../views/DataseList/DatasetList'


class Public extends Component {

  constructor(props){
    super(props)
    this.state = {
      js_scrolled: false,
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };
  
  handleScroll(event) {
    if(window.scrollY > 150){
      this.setState({
        js_scrolled: true
      })
    }
    else{
      this.setState({
        js_scrolled: false
      })
    }
  };
  

  render() {
    const { history } = this.props
    var bg = 'bg-white'
    var p = ''
    if(window.location.hash.indexOf('userstory')!==-1)
      bg="bg-light"
    if(window.location.hash.indexOf('search')!==-1)
      p='pt-5'
    return (
      <div className="app">
        <Header history={history} scrolled={this.state.js_scrolled}/>
        <div data-reactroot className={"app-body pub "+bg}>
          <main className={"w-100 " + p}>
              <Switch>
                <Route path="/home" name="Home" exact component={Home} />
                <Route path="/missione" name="Missione" exact component={Missione}/>
                <Route path="/userstory/list" name="Missione" exact component={UserStory}/>
                <Route path="/team" name="Chi Siamo" exact component={Team}/>
                <Route path="/lineeguida" name="Linee Guida" exact component={Guida}/>
                <Route path="/partecipa" name="Partecipa" exact component={Partecipa}/>
                <Route path="/search" name="Search" exact component={DatasetList}/>                                                
                <Redirect from="/" to="/home"/>
              </Switch>
          </main>
        </div>
        <Footer/>
      </div>
      );
  }
}

Public.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { loggedUser, authed } = state.userReducer['obj'] || {}
  const { properties } = state.propertiesReducer['prop'] || {}
  return { loggedUser, authed }
}

export default connect(mapStateToProps)(Public);
