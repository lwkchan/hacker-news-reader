import React, { Component } from 'react';
import './App.css';

const list = [
  {objectId: 1, details:"Get milk", status: "done", url: "http://www.facebook.com"},
  {objectId: 5, details:"Get water", status: "incomplete", url: "http://www.reddit.com"},
  {objectId: 7, details:"Get some nuts", status: "done", url: "http://www.twitter.com"},
  {objectId: 2, details:"Call mum", status: "done", url: "http://www.instagram.com"},
  {objectId: 9, details:"Get cream", status: "incomplete", url: "http://www.example.com"},
]

const isSearched = (searchTerm) => (item) =>
  item.details.toLowerCase().includes(searchTerm.toLowerCase()) // returns true if the item details match the search term

class App extends Component {
  constructor(){
    super();
    this.state = {
      list,
      searchTerm: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectId !== id);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { list, searchTerm } = this.state;
    return (
      <div className="list">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

class Search extends Component {
  render () {
    const { value, onChange } = this.props;
    return (
      <form>
        <input
        type="text"
        value={value}
        onChange={onChange}
        />
      </form>
    )
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <ul>
        {list.filter(isSearched(pattern)).map(item => {
            return (<div key ={item.objectId}>
                <li>{item.details} - {item.status}</li>
                <ul><a href={item.url}>link</a></ul>
                <ul>
                <button
                  onClick={()=> onDismiss(item.objectId)}
                  type="button"
                >
                  Dismiss
                </button>
              </ul>
            </div>)
          })}
      </ul>
  )}
}


export default App;
