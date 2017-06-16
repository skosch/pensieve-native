import React, { Component } from 'react';

import { Text } from 'react-native';

class ThoughtComponent extends Component {
  delete = () => this.props.delete(this.props.thought.timestamp)

  render() {
    const {thought} = this.props;
    return (
      <Text>{thought.text}</Text>
    );
  }
}

export default ThoughtComponent;
