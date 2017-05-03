import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      phrases: require('./phrases.json').phrases,
    }
  };

  render() {
    const phrasographs = this.state.phrases.map((phrase) => {
      const initials = getInitials(phrase.words);
      return <Phrasograph description={phrase.desc}
                          initials={initials}
                          key={initials}
                          word_arrays={phrase.words}
             />;
    });

    return (
      <div className="App">
        {phrasographs}
      </div>
    );
  }
}

class Phrasograph extends Component {
  render() {
    const lines = this.props.word_arrays.map((word_array) => {
      const first_word = word_array[0];
      return <WordLine words={word_array}
                       letter={first_word[0]}
                       key={`${this.props.initials}_${first_word}`}
        />;
    });

    return(
      <div className="phrasograph">
        <div className="title"> {this.props.description} </div>
        {lines}
      </div>
    );
  }
}

class WordLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value,
    });
  }

  getStatusClass(value) {
    return this.props.words.includes(value) ? 'correct' : '';
  }

  render() {
    const statusClass = this.getStatusClass(this.state.value.toLowerCase());

    return(
      <div className="line">
        <div className="letter uppercase inline-block"> {this.props.letter} </div>
        <input className={`inline-block ${statusClass}`} onChange={this.changeHandler.bind(this)}></input>
      </div>
    );
  }
}

function getInitials(words) {
  return words.map((word_array) => word_array[0][0]).join('');
}

export default App;
