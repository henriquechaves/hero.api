import Product from '../../../src/models/product';

describe('Routes: Products', () => {

    //let para o request do supertest e no before a aplicação é inicializada.
    let request;

    before(() => {
        return setupApp()
            .then(app => {
                request = supertest(app)
            });
    });

    // Armazena um array com um objeto referente a um produto com informações estáticas.
    const defaultProduct = {
        name: 'Default product',
        description: 'product description',
        price: 100
    };
    const expectedProduct = {
        __v: 0,
        _id: '56cb91bdc3464f14678934ca',
        name: 'Default product',
        description: 'product description',
        price: 100
    };

    beforeEach(() => {
        const product = new Product(defaultProduct);
        product._id = '56cb91bdc3464f14678934ca';
        return Product.remove({})
            .then(() => product.save());
    });

    afterEach(() => Product.remove({}));

    describe('GET /products', () => {
        it('should return a list of products', done => {

            request
                .get('/products')
                .end((err, res) => {
                    expect(res.body).to.eql([expectedProduct]);
                    done(err);
                });
        });
    });
});