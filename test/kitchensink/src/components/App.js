import React, { Component, createElement } from 'react';

const toCamelCase = str =>
  `-${str}`.replace(/-([a-z])/g, g => g[1].toUpperCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { feature: null };
  }

  async componentDidMount() {
    const features = [
      'css-inclusion',
      'global-css-inclusion',
      'scss-inclusion',
      'global-scss-inclusion',
      'sass-inclusion',
      'global-sass-inclusion',
      'less-inclusion',
      'global-less-inclusion',
      'small-image-inclusion',
      'large-image-inclusion',
      'json-inclusion',
    ];

    const requested = window.location.hash.slice(1);

    const feature = features.find(name => name === requested);

    if (!feature) {
      throw new Error(`Missing feature "${requested}"`);
    }

    const camelCased = toCamelCase(feature);

    const {
      default: component,
    } = await import(`./features/${camelCased}/${camelCased}`);

    this.setState({ feature: component });
  }

  render() {
    const { feature } = this.state;

    if (feature !== null) {
      return <div>{createElement(this.state.feature)}</div>;
    }

    return null;
  }
}

export default App;
