const request = require("supertest");
const express = require("express");
const routes = require("../src/routes/index");
const app = express();
app.use(express.json());
app.use("/", routes());

describe("Test de endpoints", () => {
  let token; // Para almacenar el token de autenticación

  // Usuarios
  describe("Usuarios", () => {
    test("POST /registrar_usuario - Debería retornar un status 201", async () => {
      const response = await request(app).post("/registrar_usuario").send({
        name: "Test User",
        email: "test@test.com",
        password:"admin1",
      });
      expect(response.statusCode).toBe(201);
    });


    test("POST /iniciar_sesion - Debería retornar un status 401 con credenciales incorrectas", async () => {
      const response = await request(app).post("/iniciar_sesion").send({
        email: "wrong@example.com",
        password: "wrongpassword",
      });
      expect(response.statusCode).toBe(401);
    });
    

    test("POST /iniciar_sesion - Debería retornar un status 201 con credenciales correctas", async () => {
      const response = await request(app).post("/iniciar_sesion").send({
        email: "admin@example.com",
        password: "admin",
      });
      expect(response.statusCode).toBe(201);
      token = response.body.token; // Guardar el token para usarlo en otras pruebas
    });

    test("GET /usuarios - Debería retornar un status 200", async () => {
      const response = await request(app)
        .get("/usuarios")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(201);
    });

    test("DELETE /usuarios/:id - Debería eliminar y retornar un status 201", async () => {
      const response = await request(app)
        .delete("/usuarios/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(201);
    });
  });

  // Productos
/*   describe('Productos', () => {
      test('POST /productos - Debería retornar un status 201', async () => {
          const response = await request(app).post('/productos').set('Authorization', `Bearer ${token}`).send({
              title: 'Test Product',
              description: 'Test Description',
              price: 100,
              img: 'test.jpg',
              category_id: 1,
              seller_id: 10
          });
          expect(response.statusCode).toBe(201);
      }); */

      test('GET /productos - Debería retornar un status 200', async () => {
          const response = await request(app).get('/productos');
          expect(response.statusCode).toBe(200);
      });

/*       test('GET /productos/:id - Debería retornar un status 200', async () => {
          const response = await request(app).get('/productos/20');
          expect(response.statusCode).toBe(200);
      }); */

  /*     test('PUT /productos/:id - Debería retornar un status 200', async () => {
          const response = await request(app).put('/productos/20').set('Authorization', `Bearer ${token}`).send({
              title: 'Updated Product',
              description: 'Updated Description',
              price: 150,
              img: 'updated.jpg',
              category_id: 1,
              seller_id: 10
          });
          expect(response.statusCode).toBe(200);
      }); */

 /*  }); */

  // Categorías
  describe('Categorías', () => {
      
      test('GET /categorias - Debería retornar un status 200', async () => {
          const response = await request(app).get('/categorias');
          expect(response.statusCode).toBe(200);
      });

      test('GET /categorias/:id - Debería retornar un status 200', async () => {
          const response = await request(app).get('/categorias/1');
          expect(response.statusCode).toBe(200);
      });

  });

  // Status
/*   describe("Status", () => {
    test("GET /status/:id - Debería retornar un status 200", async () => {
      const response = await request(app).get("/status/1");
      expect(response.statusCode).toBe(200);
    }); */

/*     test("PUT /status/:id - Debería retornar un status 201", async () => {
      const response = await request(app)
        .put("/status/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Status",
        });
      expect(response.statusCode).toBe(200);
    });
  }); */

  // // // Carrito
  // describe('Carrito', () => {
  //     test('POST /cart - Debería retornar un status 201', async () => {
  //         const response = await request(app).post('/cart').set('Authorization', `Bearer ${token}`).send({
  //           user_id: 2,
  //           total: 100,
  //           status_id: 7
  //         });
  //         expect(response.statusCode).toBe(201);
  //     });

  //     test('GET /cart/:id - Debería retornar un status 200', async () => {
  //         const response = await request(app).get('/cart/6').set('Authorization', `Bearer ${token}`);
  //         expect(response.statusCode).toBe(200);
  //     });

  // /*     test('PUT /cart/:id - Debería retornar un status 200', async () => {
  //         const response = await request(app).put('/cart/6').set('Authorization', `Bearer ${token}`).send({
  //           user_id: 2,
  //           total: 100,
  //           status_id: 8
  //         });
  //         expect(response.statusCode).toBe(200);
  //     }); */

  // });

  // Detalle del Carrito
/*   describe('Detalle del Carrito', () => {
      test('POST /detail_cart - Debería retornar un status 201', async () => {
          const response = await request(app).post('/detail_cart').set('Authorization', `Bearer ${token}`).send({
            cart_id: 2,
            product_id: 15,
            quantity: 2,
            subtotal: 200
          });
          expect(response.statusCode).toBe(201);
      });

      test('GET /detail_cart/:id - Debería retornar un status 200', async () => {
          const response = await request(app).get('/detail_cart/6').set('Authorization', `Bearer ${token}`);
          expect(response.statusCode).toBe(200);
      });

      test('PUT /detail_cart/:id - Debería retornar un status 200', async () => {
          const response = await request(app).put('/detail_cart/6').set('Authorization', `Bearer ${token}`).send({
            cart_id: 2,
            product_id: 15,
            quantity: 2,
            subtotal: 200
          });
          expect(response.statusCode).toBe(200);
      });

  }); */

  // Favoritos
/*   describe('Favoritos', () => {
      test('POST /fav - Debería retornar un status 201', async () => {
          const response = await request(app).post('/fav').set('Authorization', `Bearer ${token}`).send({
              user_id: 2,
              product_id: 7
          });
          expect(response.statusCode).toBe(201);
      });

      test('GET /fav - Debería retornar un status 200', async () => {
          const response = await request(app).get('/fav').set('Authorization', `Bearer ${token}`);
          expect(response.statusCode).toBe(200);
      });
  }); */
});
