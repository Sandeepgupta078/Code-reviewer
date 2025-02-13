const aiService = require("../services/ai.services");

module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await aiService(code);

    return res.status(200).json({ response });
};

