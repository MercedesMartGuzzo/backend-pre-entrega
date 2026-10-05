const BASE_URL = 'https://fakestoreapi.com';


const [, , method, resource, ...params] = process.argv;

const main = async () => {
  if (!method || !resource) {
    console.log('Uso: npm run start <GET|POST|DELETE> <products|products/id> [title price category]');
    return;
  }

  const [endpoint, productId] = resource.split('/');

  if (endpoint !== 'products') {
    console.log('Recurso no válido. Usá "products" o "products/<id>".');
    return;
  }

  const httpMethod = method.toUpperCase();

  try {
    switch (httpMethod) {
      case 'GET': {
        const url = productId
          ? `${BASE_URL}/products/${productId}`
          : `${BASE_URL}/products`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        break;
      }

      case 'POST': {
        const [title, price, category] = params;

        if (!title || !price || !category) {
          console.log('Uso: npm run start POST products <title> <price> <category>');
          return;
        }

        const newProduct = { title, price: Number(price), category };

        const response = await fetch(`${BASE_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        console.log(data);
        break;
      }

      case 'DELETE': {
        if (!productId) {
          console.log('Uso: npm run start DELETE products/<productId>');
          return;
        }

        const response = await fetch(`${BASE_URL}/products/${productId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        console.log(data);
        break;
      }

      default:
        console.log(`Método "${method}" no soportado. Usá GET, POST o DELETE.`);
    }
  } catch (error) {
    console.error('Error en la petición:', error.message);
  }
};

main();