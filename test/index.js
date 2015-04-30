var React = require('react')
var ReactMap = require('../')
var Marker = ReactMap.Marker

var App = React.createClass({
	render: function() {
    var center = {
      lat: -37.8602828,
      lng: 145.079616
    }

    return (<div>
      {/*<h1>react-maps</h1>*/}
      <ReactMap center={center} zoom={8}>
      </ReactMap>
    </div>)
	}
})

React.render(<App/>, document.getElementById('app'))
