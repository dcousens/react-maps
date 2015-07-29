let React = require('react')
let GoogleMap = require('../../src/index')

let App = React.createClass({
  getInitialState () {
    return {
      t: 0,
      center: {
        lat: -37.9,
        lng: 145.08
      },
      marker: {
        lat: -37.9,
        lng: 145.08
      }
    }
  },

  componentDidMount () {
    setInterval(() => {
      let dx = 0.6 * Math.cos(this.state.t)
      let dy = 0.6 * Math.sin(this.state.t)

      this.setState({
        t: this.state.t + 0.01,
        marker: {
          lng: this.state.center.lng + dx,
          lat: this.state.center.lat + dy
        }
      })
    }, 10)
  },

  render () {
    let marker1 = this.refs.marker1

    return (
      <GoogleMap center={this.state.center} zoom={8}>
        <GoogleMap.Marker ref='marker1' position={this.state.marker} label={'A pleasant place to live'} />
        <GoogleMap.InfoWindow anchor={marker1 && marker1.getMarker()} open>
          <h4>Marker</h4>
        </GoogleMap.InfoWindow>

        <GoogleMap.InfoWindow position={this.state.center} open>
          <h2>Center</h2>
        </GoogleMap.InfoWindow>
      </GoogleMap>
    )
  }
})

React.render(React.createElement(App), document.getElementById('app'))
