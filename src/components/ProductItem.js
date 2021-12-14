import React from 'react';

export default class ProductItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	addToCart = () => {
		console.log('productItem lafda before: '+ localStorage.getItem('activeuserId'))
		let cart = localStorage.getItem(localStorage.getItem('activeuserId')) ? JSON.parse(localStorage.getItem(localStorage.getItem('activeuserId'))) : {};
		console.log('productItem lafda after: '+ localStorage.getItem('activeuserId'))
		let id = this.props.product.id.toString();
		cart[id] = (cart[id] ? cart[id]: 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.available_quantity < qty) {
			cart[id] = this.props.product.available_quantity; 
			console.log("add to cart: if part: " + cart[id] )
		} else {
			cart[id] = qty
			console.log("add to cart: else part: " + cart[id] )
		}
		localStorage.setItem( localStorage.getItem('activeuserId'), JSON.stringify(cart));
	}

	render(){
		const { product } = this.props;
		product.available_quantity = 100
		return (
		    <div className="card" style={{ marginBottom: "10px"}}>
			  <div className="card-body">
			    <h4 className="card-title">{product.name}</h4>
				<img src={product.imageUrl}/*"https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=450"*/ />
			    <p className="card-text">{product.description}</p>
			    <h5 className="card-text"><small>price: </small>${product.price}</h5>
			    <span className="card-text"><small>Available Quantity: </small>{product.available_quantity}</span>
			    
			    { product.available_quantity > 0 ?
			    	<div>
			    		<button className="btn btn-sm btn-warning float-right" onClick={this.addToCart}>Add to cart</button>
			    		<input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
			    	</div> : 
			    	<p className="text-danger"> product is out of stock </p>
			 	}

			  </div>
			</div>
		)
	}
}
