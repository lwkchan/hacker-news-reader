import React, { Component } from 'react';
import logo from './logo.svg';
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
    return (
      <div className="list">
      <form>
        <input
        type="text"
        onChange={this.onSearchChange}
        />
      </form>
        <ul>
          {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => {
              return (<div key ={item.objectId}>
                  <li>{item.details} - {item.status}</li>
                  <ul><a href={item.url}>link</a></ul>
                  <ul>
                  <button
                    onClick={()=>this.onDismiss(item.objectId)}
                    type="button"
                  >
                    Dismiss
                  </button>
                </ul>
              </div>)
            })}
        </ul>
      </div>
    );
  }
}

export default App;
