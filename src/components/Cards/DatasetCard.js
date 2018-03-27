import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom';
import HomeService from '../../views/Home/services/HomeService';
import { truncateDatasetName } from "../../utility";
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faLock, faGlobe } from '@fortawesome/fontawesome-free-solid'
import { decodeTheme } from '../../utility' 


const homeService = new HomeService();

class DatasetCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            detail: undefined
        }
    }

    componentDidMount(){
        let response = homeService.datasetDetail(this.props.dataset.name)
        response.then(json => {
            this.setState({
                detail: json
            })
        })
    }

    componentWillUnmount(){
        this.setState({
            detail: undefined
        })
    }

    mesi = ['',' Gennaio ',' Febbraio ',' Marzo ',' Aprile ',' Maggio ',' Giugno ',' Luglio ',' Agosto ',' Settembre ',' Ottobre ', ' Novembre ', ' Dicembre ']

    render(){
        const { dataset } = this.props
        const { detail } = this.state
        return (
            <div className="mx-auto">
                <div className="card bg-gray-100 card-dataset">
                    <div className="header-dataset row mx-0 py-1 b-b-card">
                        <div className="col-10 slug-dataset my-1 pl-3">
                            <div className="my-1">{truncateDatasetName(dataset.name)}</div>
                        </div>
                        <div className="col-2 my-2">
                            {
                                dataset.organization.name !== 'default_org' &&
                                //<span className="badge badge-pill badge-danger fa-pull-right badge-dash my-1" title="Il dataset è privato"> </span>
                                //<i className="fa fa-lock fa-pull-right fa-lg text-icon my-1 pointer" title='Il dataset è privato'/>
                                <span className="pointer" title='Il dataset è privato'><i icon={faLock} className="fas fa-lock fa-pull-right text-icon pointer" style={{fontSize: '16px'}}/></span>
                            }
                            {
                                dataset.organization.name === 'default_org' &&
                                //<span className="badge badge-pill badge-success fa-pull-right badge-dash my-1" title="Il dataset è pubblico"> </span>
                                //<i className="fa fa-globe fa-pull-right fa-lg text-icon my-1 pointer" title='Il dataset è pubblico'/>
                                <span className="pointer" title='Il dataset è pubblico'><i icon={faGlobe} className="fas fa-globe fa-pull-right text-icon pointer" style={{fontSize: '16px'}}/></span>
                            }
                        </div>
                    </div>
                    <div className="dataset-body b-b-card">
                        <div className="title-dash pl-3 ml-0">
                            <Link to={"/dataset/" + dataset.name}>
                                <h3 className="card-title text-primary">{dataset.title}</h3>
                            </Link>
                            {/* <h6 className="card-subtitle mb-2 text-muted">{dash.subtitle}</h6> */}
                        </div>
                        <div className="card-text row m-0 mt-3 ml-3">
                            <p className="col-8 pl-0 m-0">{detail?detail.dcatapit.publisher_name:''}</p>
                        </div>
                    </div>
                    <div className="header-dataset row m-0 b-b-card">
                        <div className="col-3 my-2 pl-3">
                            <span className="badge badge-secondary my-1">JSON</span>
                        </div>
                        <div className="col-2 my-2">
                            <span className="badge badge-accento my-1">{detail?decodeTheme(detail.dcatapit.theme):''} </span>
                        </div>
                    </div>
                    <div className="header-dataset row m-0 py-1">
                        <div className="col-2 my-2 text-center">
                            <i className="text-icon fas fa-calendar"/>
                        </div>
                        <div className="col-10 my-2 p-0">
                            Creato il {detail?detail.dcatapit.modified:''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DatasetCard