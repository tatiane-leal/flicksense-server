const axios = require("axios");

const handleAnalysis = async (req, res) => {
  try {
    const userReview = req.body.review;
    console.log("user review is:", userReview);
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const apiUrl = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${googleApiKey}`;

    const googleResponse = await axios.post(apiUrl, {
      document: {
        type: "PLAIN_TEXT",
        content: userReview,
      },
    });

    const sentimentScore = googleResponse.data.documentSentiment.score;
    console.log("sentiment score is:", sentimentScore);
    let sentimentResult;

    if (sentimentScore > 0.5) {
      sentimentResult = { isHappy: true };
    } else if (sentimentScore < -0.5) {
      sentimentResult = { isSad: true };
    } else {
      sentimentResult = { isNeutral: true };
    }

    res.json({ sentiment: sentimentResult });
  } catch (error) {
    if (error.response) {
      console.error("Error response:", {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);

    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleAnalysis };
