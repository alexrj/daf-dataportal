import { serviceurl } from '../../../../config/serviceurl.js'

export default class DashboardService {
    
    baseUrl = serviceurl.apiURLDatiGov + serviceurl.apiURL_dati_gov + "/dashboards";
    //baseUrl = serviceurl.apiURL_mock  + "/dashboards/list";

    constructor() {

    }

    async get(id) {
        const response = await fetch( this.baseUrl + "/" + id );
        return response.json();
    }

    async list(layout, widgets) {
        const response = await fetch( this.baseUrl );
        return response.json();
    }

    async save(dashboard) {

        let id = dashboard.id || "save"
        
        const response = await fetch( this.baseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dashboard)
        })
        
        return response.json();
    }
    
    async remove(id) {

        const response = await fetch( this.baseUrl + "/" + id , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        
        return response.json();
    }
} 