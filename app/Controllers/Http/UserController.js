"use strict";
const User = use("App/Models/User");
const Address = use("App/Models/Address");

class UserController {
  async authenticate({ request, auth, response }) {
    const { email, password } = request.all();

    const user = await User.findBy("email", email);

    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }
    const { id, name, profile } = user;
    const { token } = await auth.attempt(email, password);

    return response.json({
      user: {
        id,
        profile,
        name,
        email,
      },
      token,
    });
  }

  async store({ request }) {
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

  async index({ request, auth }) {
    const user = await User.findBy("id", auth.user.id);
    return user;
  }

  async update({ request, auth }) {
    const { email, username, birthDate, mobilePhone, cpf } = request.all();
    const user = await User.findBy("id", auth.user.id);
    user.email = email;
    user.username = username;
    user.birthDate = birthDate;
    user.mobilePhone = mobilePhone;
    user.cpf = cpf;
    await user.save();

    const newUser = await User.findBy("id", auth.user.id);

    return { newUser };
  }
}

module.exports = UserController;
