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
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
    type="text"
    value={value}
    onChange={onChange}
    />
  </form>

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.details}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.status}
        </span>
        <span style={{ width: '30%' }}>
          <Button
            onClick={() => onDismiss(item.objectId)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

const Button = ({onClick, className = '', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
    >
      {children}
    </button>

export default App;
