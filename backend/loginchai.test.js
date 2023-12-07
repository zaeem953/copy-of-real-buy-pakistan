const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('./index');  
const spies = require('chai-spies');

chai.use(chaiHttp);
chai.use(spies);

const expect = chai.expect;

chai.spy.on(require('./config'), 'query', (sql, params, callback) => {
    if (params[0] === 'zaeem@email.com' && params[1] === 'abc123') {
      callback(null, [{ username: 'testuser' }]);
    } else {
      callback(null, []);
    }
  });
  

describe('POST /login', () => {
  it('should log in a user with valid credentials', async () => {

    const expectedToken = jwt.sign({ user: { username: 'testuser' } }, 'buy-pakistan', { expiresIn: '2h' });

    const response = await chai.request(app)
      .post('/login')
      .send({ email: 'zaeem@email.com', password: 'abc123' });

    expect(response).to.have.status(200);
   
    expect(response.body).to.have.property('auth').that.equals(expectedToken);
  });
});


  
