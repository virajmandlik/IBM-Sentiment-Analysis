require("dotenv").config();
const { IgApiClient } = require("instagram-private-api");
const { get } = require("request-promise");



const loginToInstagram = async (username, password) => {
  try {
    const ig = new IgApiClient();
    ig.state.generateDevice(username);
    const loggedInUser = await ig.account.login(username, password);

    return {
      success: true,
      username: loggedInUser.username,
    };
  } catch (error) {
    console.error("Instagram login error:", error.message);
    return {
      success: false,
      error: "Invalid Instagram username or password.",
    };
  }
};


const postToInstagram = async (username, password, imageUrl, caption) => {
    try {
      console.log("the image url is", imageUrl,caption,password,username);
      const ig = new IgApiClient();
      ig.state.generateDevice(username);
      await ig.account.login(username, password);
  
      const imageBuffer = await get({ url: imageUrl, encoding: null });
  
      await ig.publish.photo({ file: imageBuffer, caption });
      return { success: true };
    } catch (error) {
      console.error("Error posting to Instagram:", error.message);
      return { success: false };
    }
  };
  
  module.exports = { loginToInstagram, postToInstagram };
  