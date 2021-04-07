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
    const { name, whatsapp, profile, bio } = request.all();
    const user = await User.findBy("id", auth.user.id);
    user.name = name;
    user.whatsapp = whatsapp;
    user.profile = profile;
    user.bio = bio;
    await user.save();

    const newUser = await User.findBy("id", auth.user.id);

    return { newUser };
  }
  async show({ request, auth, params }) {
    const user = await User.findBy("id", params.id);
    return {
      id: user.id,
      profile: user.profile,
      bio: user.bio,
      whatsapp: user.whatsapp,
      email: user.email,
      name: user.name,
    };
  }
}

module.exports = UserController;
