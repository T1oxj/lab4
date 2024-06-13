document.addEventListener("DOMContentLoaded", function () {
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products');
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Ціна: ${product.cost}</p>
                    <p>Опис: ${product.description}</p>
                    <p>Рейтинг: ${product.rate}</p>
                    <p>Дата: ${product.date}</p>
                    <img src="${product.image}" alt="${product.name}" style="width: 100px;">
                `;
                productsContainer.appendChild(productDiv);
            });
        });
});
