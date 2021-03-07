"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request }) {
    const data = request.only([
      "name",
      "email",
      "password",
      "profile",
      "bio",
      "whatsapp",
      "cost",
    ]);

    const user = await User.create(data);

    return user;
  }

  async authenticate({ request, auth, response }) {
    const { email, password } = request.all();

    const user = await User.findBy("email", email);

    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }
    const { id, name } = user;
    const { token } = await auth.attempt(email, password);

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }
}

module.exports = AuthController;
