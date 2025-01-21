const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { apiKey, scoringUrl, tokenUrl } = require("../config/ibmConfig");

function getToken() {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("POST", tokenUrl);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Accept", "application/json");
    req.onload = () => resolve(JSON.parse(req.responseText).access_token);
    req.onerror = () => reject(new Error("Error fetching token"));
    req.send(
      `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`
    );
  });
}

function getPrediction(token, payload) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("POST", scoringUrl);
    req.setRequestHeader("Authorization", `Bearer ${token}`);
    req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => resolve(JSON.parse(req.responseText));
    req.onerror = () => reject(new Error("Error during prediction"));
    req.send(JSON.stringify(payload));
  });
}

module.exports = async (req, res) => {
  try {
    const { fields, values } = req.body;
    const token = await getToken();
    const payload = { input_data: [{ fields, values }] };
    const prediction = await getPrediction(token, payload);
    res.status(200).json({ prediction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
