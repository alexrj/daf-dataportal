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
import Notizie from '../../views/Public/Notizie/NotizieList';
import NotizieDett from '../../views/Public/Notizie/NotizieDett';
import UserStoryList from '../../views/UserStory/components/UserStoryList';
import UserStoryView from '../../views/UserStory/components/UserStoryView';
import DataApplication from '../../views/Public/DataApplication/DataApplication';
import DatasetList from '../../views/DataseList/DatasetList'
import DatasetDetail from '../../views/DatasetDetail/DatasetDetail'

class Public extends Component {

  constructor(props){
    super(props)
  }
  

  render() {
    const { history } = this.props
    var bg = 'bg-white'
    var p = ''
    if(window.location.hash.indexOf('userstory')!==-1)
      bg="bg-light"
    if(window.location.hash.indexOf('search')!==-1)
      p='py-5'
    if(window.location.hash.indexOf('userstory')!==-1)
      p='py-5'

      window.scrollTo(0,0)
    return (
      <div className="app">
        <Header history={history} />
        <div data-reactroot className={"app-body pub "+bg}>
          <main className={"w-100 " + p}>
              <Switch>
                <Route path="/home" name="Home" exact component={Home} />
                <Route path="/missione" name="Missione" exact component={Missione}/>
                <Route path="/userstory/list" name="Storie" exact component={UserStoryList}/>
                <Route path="/userstory/list/:id" name="Dettaglio Storie" exact component={UserStoryView}/>
                <Route path="/team" name="Chi Siamo" exact component={Team}/>
                <Route path="/lineeguida" name="Linee Guida" exact component={Guida}/>
                <Route path="/partecipa" name="Partecipa" exact component={Partecipa}/>
                <Route path="/datapplication" name="Data Applcation" exact component={DataApplication}/>
                <Route path="/notizie" name="Notizie" exact component={Notizie}/>
                <Route path="/notizie/:id" name="Dettaglio Notizie" exact component={NotizieDett}/>
                <Route path="/dataset/:id" name="Dettaglio Dataset" exact component={DatasetDetail}/>
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