$(document).ready(function () {
    function loadProducts() {
        $.getJSON('/products', function (data) {
            const tableBody = $('#productsTable tbody');
            tableBody.empty();
            $.each(data, function (id, product) {
                tableBody.append(`
                    <tr data-id="${id}">
                        <td>${product.name}</td>
                        <td>${product.cost}</td>
                        <td>${product.description}</td>
                        <td>${product.rate}</td>
                        <td>${product.date}</td>
                        <td><img src="${product.image}" alt="${product.name}" style="width: 50px;"></td>
                        <td><button class="delete-btn">Видалити</button></td>
                    </tr>
                `);
            });
        });
    }

    loadProducts();

    $('#search').on('keyup', function () {
        const value = $(this).val().toLowerCase();
        $("#productsTable tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#addProductForm').submit(function (event) {
        event.preventDefault();
        const newProduct = {
            name: $('#name').val(),
            cost: $('#cost').val(),
            description: $('#description').val(),
            rate: $('#rate').val(),
            date: $('#date').val(),
            image: $('#image').val()
        };
        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newProduct),
            success: function () {
                loadProducts();
                $('#addProductForm')[0].reset();
            }
        });
    });

    $('#productsTable').on('click', '.delete-btn', function () {
        const id = $(this).closest('tr').data('id');
        $.ajax({
            url: `/products/${id}`,
            method: 'DELETE',
            success: function () {
                loadProducts();
            }
        });
    });
});

