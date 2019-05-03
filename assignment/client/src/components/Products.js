import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Products extends Component {
    constructor(props) {
        super(props);
        //this.updatePost = this.updatePost.bind(this);
        //this.deletePost = this.deletePost.bind(this);
        //this.getPost = this.getPost.bind(this);
        this.state = {
          posts:[]
        };
    }

    async componentDidMount() {
        this.props.getproduct()

    }
    render() {
        return(
            <div>
                Product!!!!!!!!!!!!!!!!!!!!
                <br/>
                <div class="list-group">
                    <a href="/edit" class="list-group-item list-group-item-action flex-column align-items-start active">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Title: {this.props.title}</h5>
                        </div>
                        <p class="mb-1">Description: {this.props.description}</p>
                        <small>Price: {this.props.price}</small> <small>Company: {this.props.company}</small>
                    </a>         
                </div>
                <nav>
                <ul class="nav nav-pills pull-right">
                    <li role="presentation" id="addHyperLink"><a href="/addPost">Add</a></li>
                </ul>
                </nav>
                <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Subject</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.posts.map(function(post,index) {
                   return <tr key={index} >
                            <td>{index+1}</td>
                            <td>{this.props.title}</td>
                            <td>{this.props.description}</td>
                            <td>
                              <span className="glyphicon glyphicon-pencil"></span>
                            </td>
                            <td>
                              <span className="glyphicon glyphicon-remove"></span>
                            </td>
                          </tr>
                }.bind(this))
              }
            </tbody>
          </table>
            </div>
            
            
        );
    }
}



function mapStateToProps(state) {
    return {
        title: state.item.products.title,
        description : state.item.products.description,
        price: state.item.products.price,
        company: state.item.products.company
    }
}



export default connect(mapStateToProps, actions)(Products);