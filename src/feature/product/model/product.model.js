let id=1;
const products = [
    {id: id++, title: "Product 1", description: "Description 1", price: 100},
    {id: id++, title: "Product 2", description: "Description 2", price: 200},
    {id: id++, title: "Product 3", description: "Description 3", price: 300}
];

export const fetchAllProducts = () => {
    return products;
}