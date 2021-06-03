import { app } from "../src/index";
import chai from "chai";
import chaiHttp from "chai-http";

const expect = chai.expect;

process.env.NODE_ENV = "testing";

chai.use(chaiHttp);

const INVALID_USERNAME = "test";
const INVALID_PASSWORD = "invalidpassword";

const VALID_USERNAME = "root";
const VALID_PASSWORD = "P@ssw0rd";

const INVALID_REFRESH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzZGx5LWF1dGgtc2VydmVyIiwiYXVkIjoiQXBwbGljYXRpb24gYmFzZS11c2VyIiwicGF5bG9hZCI6eyJsb2dpbiI6InJvb3QiLCJkaXNwbGF5TmFtZSI6Ik1pY2hhxYIgUG9kc2lhZMWCeSIsInJhbmsiOiJ1c2VyIn0sImlhdCI6MTYxNTk5NDM3MiwiZXhwIjoxNjE1OTk3MzcyfQ.yU747KjkmhA5ceSIA23-_Kb61qbjBXdcwdVmnR4TEST";

const VALID_USER = {
  login: VALID_USERNAME,
  password: VALID_PASSWORD,
};

const INVALID_USER = {
  login: VALID_USERNAME,
  password: INVALID_PASSWORD,
};

let refreshToken = "";

describe("API V1 Tests", () => {
  describe("/", () => {
    it("Receives valid response at GET /", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body).to.not.have.property("error");
          expect(res.body.message).to.equal("Service is up and running.");
          done();
        });
    });
  });

  describe("/login", () => {
    it("Receives error when no data is sent at POST /login", (done) => {
      chai
        .request(app)
        .post("/login")
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.have.property("body");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal("Some parameters are missing.");
          done();
        });
    });

    it("Receives error when missing data is sent at POST /login", (done) => {
      chai
        .request(app)
        .post("/login")
        .send({ login: INVALID_USERNAME })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.have.property("body");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal("Some parameters are missing.");
          done();
        });
    });

    it("Receives error when invalid data is sent at POST /login", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(INVALID_USER)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.have.property("body");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal("Password is invalid.");
          done();
        });
    });

    it("Receives error when invalid JSON (syntax error) is sent at POST /login", (done) => {
      chai
        .request(app)
        .post("/login")
        .send('{"invalid"}')
        .type("json")
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res).to.have.property("body");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal("Unproccessable JSON. Syntax Error");
          done();
        });
    });

    it("Receives access token and refresh token when valid credentials are sent at POST /login", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(VALID_USER)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("accessToken");
          expect(res.body).to.have.property("refreshToken");
          expect(res.body).to.not.have.property("error");

          // Asign refresh token for further use
          refreshToken = res.body.refreshToken;

          done();
        });
    });
  });

  describe("/refresh", () => {
    it("Receives error when no token is supplied at POST /refresh", (done) => {
      chai
        .request(app)
        .post("/refresh")
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.have.property("body");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.not.property("message");
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal(
            "Token is missing, supply request with proper auth header."
          );
          done();
        });
    });

    it("Receives error when invalid token is supplied at POST /refresh", (done) => {
      chai
        .request(app)
        .post("/refresh")
        .set("Authorization", INVALID_REFRESH_TOKEN)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res).to.have.property("body");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.not.property("message");
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal(
            "Server could not process your token."
          );
          done();
        });
    });

    it("Receives new access token when valid refresh token is supplied at POST /refresh", (done) => {
      chai
        .request(app)
        .post("/refresh")
        .set("Authorization", `Bearer ${refreshToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.not.property("message");
          expect(res.body).to.have.not.property("error");
          expect(res.body).to.have.property("accessToken");
          done();
        });
    });
  });
});
