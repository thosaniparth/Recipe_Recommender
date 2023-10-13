const chai = require('chai');
const chaiHttp = require('chai-http');
const { app }= require("../app");

chai.use(chaiHttp);
chai.should();

describe('Sign In Route', () => {
	describe('Get Request', () => {
		it('should return sign in page', (done) => {
			chai.request(app)
				.get('/signIn')
				.end((err, res) => {
					if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          done();
				});
		});
    });
    describe('Post Request', () => {
		it('should return successfully signed in', (done) => {
			chai.request(app)
        .post('/signIn')
        .send({
            username: 'tanay',
            password: 'tanay'
        })
				.end((err, res) => {
					if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          done();
				});
		});
    it('should return incorrect username or password', (done) => {
			chai.request(app)
        .post('/signIn')
        .send({
            username: 'tanay',
            password: 'abcd'
        })
				.end((err, res) => {
          res.should.have.status(500);
          done();
				});
		});
    });
});

describe('Sign Up Route', () => {
	describe('Get Request', () => {
		it('should return sign up page', (done) => {
			chai.request(app)
				.get('/signUp')
				.end((err, res) => {
					if (err) {
              console.log(err);
          }
					res.should.have.status(200);
					done();
				});
		});
    });
    describe("Post request", () => {
        it('should return signed up', (done) => {
            chai.request(app)
          .post('/signUp')
          .send({
              username: 'tanny',
              password: 'tanay',
          })
          .end((err, res) => {
              if (err) {
                  console.log(err);
              }
              res.should.have.status(200);
              done();
          });
        });
    })
  });