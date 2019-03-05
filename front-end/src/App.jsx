import ReactDOM from 'react-dom';
import React from 'react';
import UserList from './users/index'

let contentNode = document.getElementById('contents');
let component = <h1>HelloWorld!<br/><UserList/></h1>;
ReactDOM.render(component, contentNode);