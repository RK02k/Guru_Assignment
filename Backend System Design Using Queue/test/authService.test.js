const { expect } = require("chai");
const sinon = require("sinon");
const authService = require("../src/auth/authService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");

describe("Auth Service", () => {
  afterEach(() => {
    sinon.restore(); // Reset any stubs or mocks
  });

  it("should register a user successfully", async () => {
    const fakeUser = {
      save: sinon.stub().resolves(),
    };
    sinon.stub(User.prototype, "save").resolves(fakeUser);
    const result = await authService.registerUser("testuser", "password123");
    expect(result.message).to.equal("User registered successfully");
  });

  it("should throw an error if user not found during authentication", async () => {
    sinon.stub(User, "findOne").resolves(null);
    try {
      await authService.authenticateUser("nonexistentuser", "password");
    } catch (error) {
      expect(error.message).to.equal("User not found");
    }
  });

  it("should return a valid token for valid credentials", async () => {
    const fakeUser = {
      username: "testuser",
      password: await bcrypt.hash("password123", 10),
    };
    sinon.stub(User, "findOne").resolves(fakeUser);
    const token = await authService.authenticateUser("testuser", "password123");
    expect(token).to.be.a("string");
  });
});
