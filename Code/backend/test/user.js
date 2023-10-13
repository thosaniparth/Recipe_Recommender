const chai = require('chai');
const chaiHttp = require('chai-http');
const { app }= require("../app")

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
		it('should return signed in', (done) => {
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
    });
});
