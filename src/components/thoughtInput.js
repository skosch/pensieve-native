import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as thoughtActionCreator from '../actions/thoughtActions';

class ThoughtInputComponent extends Component {
  updateValue = (text) => this.props.thoughtUpdateCurrentValue(text)

  render() {
    return (
      <TextInput
        style={{width: '100%'}}
        onChangeText={this.updateValue}
        value={this.props.currentThoughtInputValue}
        onSubmitEditing={this.props.thoughtAdd}
      />
    );
  }
}

export default connect(
  ({ui}) => {
    return {
      currentThoughtInputValue: ui.currentThoughtInputValue
    };
  },
  thoughtActionCreator
)(ThoughtInputComponent);
