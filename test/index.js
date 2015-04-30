var React = require('react')
var ReactMap = require('../')
var Marker = ReactMap.Marker

var App = React.createClass({
  getInitialState: function () {
    return {}
  },

  handleWindowResize: function() {
    this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    }); 
  },

  componentDidMount: function () {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
	render: function() {
    var center = {
      lat: -37.8602828,
      lng: 145.079616
    }

    return (<div>
      {/*<h1>react-maps</h1>*/}
      <ReactMap center={center} zoom={8} height={this.state.windowHeight} width={this.state.windowWidth}>
      </ReactMap>
    </div>)
	}
})

React.render(<App/>, document.getElementById('app'))
