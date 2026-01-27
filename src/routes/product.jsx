function Product() {
	const product = {
		name: 'Product',
		cost: 400,
		amount: 5,
	};
    return (
	<div>
		<h2>Product page</h2>
		<p>Name: {product.name}</p>
		<p>Cost: {product.cost}</p>
		<p>Amount: {product.amount}</p>
	</div>
);
}

export default Product;