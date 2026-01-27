function Product2() {
	const product = {
		name: 'Второй продукт',
		cost: 800,
		amount: 23456,
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

export default Product2;