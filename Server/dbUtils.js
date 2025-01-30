const ibm_db = require("ibm_db");

// Db2 configuration
const dbConfig = {
  database: "bludb",
  hostname:
    "3883e7e4-18f5-4afe-be8c-fa31c41761d2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud",
  port: "31498",
  username: "dtc33183",
  password: "JfwkdTIuO9OfIguH",
  security: "SSL",
};

const saveAnalysisToDb = async (statement, sentiment, emotions) => {
  try {
    const conn = ibm_db.openSync(dbConfig);

    const query = `
      INSERT INTO sentiment_analysis (combined_statement, sentiment, emotions)
      VALUES (?, ?, ?)
    `;

    // Convert emotions object to JSON string
    const params = [statement, sentiment, JSON.stringify(emotions)];

    console.log("Executing Query:", query);
    console.log("With Parameters:", params);

    conn.querySync(query, params);
    conn.closeSync();

    console.log("✅ Data saved to Db2 successfully!");
  } catch (error) {
    console.error("❌ Error saving data to Db2:", error.message);
    throw error;
  }
};

const savePatientSentiment = async (
  name,
  age,
  sentiment,
  emotions,
  type,
  country,
  city,
  state,
  gender
) => {
  try {
    console.log("🟡 Connecting to database...");
    const conn = ibm_db.openSync(dbConfig);

    console.log("✅ Connected. Preparing to insert data...");

    // 🟢 Ensure emotions is a string
    const emotionsString = JSON.stringify(emotions);

    const query = `
      INSERT INTO patient_sentiments (name, age, sentiment, emotions, type, country, city, state, gender)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      name,
      age,
      sentiment,
      emotionsString, // 🟢 Convert object to string
      type,
      country,
      city,
      state,
      gender,
    ];

    console.log("🔍 Executing Query:", query);
    console.log("📝 With Parameters:", params);

    conn.querySync(query, params);
    conn.closeSync();

    console.log(`✅ Data saved successfully for ${name}`);
  } catch (error) {
    console.error("❌ Error saving patient sentiment data:", error);
    throw error;
  }
};

module.exports = {
  saveAnalysisToDb,
  savePatientSentiment,
};
