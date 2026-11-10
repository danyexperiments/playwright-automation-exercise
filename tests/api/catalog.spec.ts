import { expect, test } from '@playwright/test';

test.describe('Catalog API', { tag: ['@api', '@smoke'] }, () => {
  test('returns a product list', async ({ request }) => {
    const response = await request.get('/api/productsList');
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Blue Top',
          price: 'Rs. 500',
        }),
      ]),
    );
  });

  test('returns a brand list', async ({ request }) => {
    const response = await request.get('/api/brandsList');
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.brands).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          brand: 'Polo',
        }),
      ]),
    );
  });

  test('searches products by name', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      form: { search_product: 'Blue Top' },
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Blue Top',
        }),
      ]),
    );
  });
});
