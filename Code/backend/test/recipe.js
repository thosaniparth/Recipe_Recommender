const chai = require('chai');
const chaiHttp = require('chai-http');
const { app }= require("../app");

chai.use(chaiHttp)
chai.should()


describe('Post Recipes Route', () =>{
  it("should create a document in database", (done) =>{
    chai.request(app)
    .post('/api/v4/recipes/Addrecipes')
    .type('form')
    .send({
      'recipe_name': 'Testing Recipe',
      'recipe_ingredients': 'Dummy, ingredients, chai, mocha, git',
      'recipe_cuisine': 'NodeJS with Express',
      'recipe_time': '15',
      'recipe_url': 'https://youtu.be/MLTRHc5dk6s?si=FygvpvY7fTOSFqIi',
      'recipe_instructions': 'Check documentation for testing examples and implementations.'
    })
    .end((err, res) => {
      if(err) {console.log("Yeh hai Error", err);}
      res.should.have.status(201)
      done();
    })
  })
})


