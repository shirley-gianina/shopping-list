import React from 'react';
import axios from 'axios';
import './index.css';

const API_URL = "http://localhost:3000/shopping-list";

class ShoppingList extends React.Component {
  state = {
    title: "Shopping List",
    newProduct: "",
    list: []
  }

  async componentDidMount() {
    this.updateProducts();
  }

  async updateProducts() {
    const response = await axios.get(API_URL)
    this.setState({list: response.data})
  }

  async removeItem(item) {
    const URL = `${API_URL}/${item._id}`
    await axios.delete(URL);
    this.updateProducts()
  }

  async addItem() {
    if(this.state.newProduct !== "") {
      const item = {title: this.state.newProduct, quantity: 1};
      await axios.post(API_URL, item)
      this.updateProducts()
      this.setState({ newProduct:"" })
    }
  }

  handleChange(e) {
    this.setState({newProduct: e.target.value})
  }

  render () {
    return (
      <div className='shopping-list'>
        <div className='header'>
          <h1>{this.state.title}</h1>
          <div>
            <input type="text"
                   value={this.state.newProduct}
                   onChange={(e) => this.handleChange(e)}
            ></input>
            <button onClick={()=> this.addItem()}>Add</button>
          </div>
        </div>
        <div className='list'>
          {
            this.state.list.map((item) => (
              <div key={item._id}>
                <p>{item.title}</p>
                <button onClick={() => this.removeItem(item)}>X</button>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ShoppingList;
