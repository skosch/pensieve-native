import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as thoughtActionCreator from '../actions/thoughtActions';

import { ListView } from 'react-native';

import Thought from './Thought';

const filterThoughts = (thoughts, search) => {
  let results = [];
  for (let i = 0, l = thoughts.length; i < l; i++) {
    if (thoughts[i].text.indexOf(search) >= 0) {
      results.push(thoughts[i]);
    }
  }
  return results;
}

class ThoughtListComponent extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.thoughts),
    };
  }

  componentWillReceiveProps(newProps) {
    const {thoughts, currentThoughtInputValue} = newProps;

    let filteredThoughts = thoughts;
    if (currentThoughtInputValue.startsWith("/")) {
      filteredThoughts = filterThoughts(this.props.thoughts, this.props.currentThoughtInputValue.slice(1));
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filteredThoughts)
    });
  }

  renderThought(thought) {
    return <Thought thought={thought} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderThought}
        enableEmptySections={true}
      />
    );
  }
}

export default connect(
  (store) => {
    return {
      currentThoughtInputValue: store.ui.currentThoughtInputValue,
      thoughts: store.thoughts.thoughts,
    };
  },
  thoughtActionCreator
)(ThoughtListComponent);
