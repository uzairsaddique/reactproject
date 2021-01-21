import React from 'react'
import './style.css'

 function Formwerther(props) {
    return (
        <div className ="container">
            <div>{props.error ? error():null}</div>
            <form onSubmit={props.loadweather}>
                <div className="row">
                <div className="cal-md-3 offset-md-2">
                    <input type="text" className="form-control" name="city" autoComplete="off" placeholder="city"/>
                </div>
                <div className="cal-md-3">
                <input type="text" className="form-control" name="country" autoComplete="off" placeholder="country"/>

                </div>
                <div className="cal-md-3 mt-md-0 text-md-left weather-size">
                    <button className="btn btn-warning">weather</button>
                </div>

            </div>
            </form>
            
        </div>
    )
}
function error() {
    return<div className="alert alter-danger mx-5" role="alter">
        Pleaser enter a city and country
    </div>
    
}
export default Formwerther;