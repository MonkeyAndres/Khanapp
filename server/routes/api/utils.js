const axios = require('axios');
const Challenge = require('../../models/Challenge');
const _ = require('lodash');

const pickRandonChallenges = async (numberOfChallenges, topic, difficulty) => {
    const url = `https://opentdb.com/api.php?amount=${numberOfChallenges}&category=${topic}&difficulty=${difficulty}`;

    const res = await axios.get(url);
    const challenges = await addResultsToDB(res.data.results);
    return challenges;
}

const addResultsToDB = async (results) => {
    const challenges = [];

    for(const result of results) {
        const challenge = await addChallenge(result);
        challenges.push(challenge);
    }

    return challenges;
}

const addChallenge = async (challenge) => {
    const existingChallenge = await Challenge.findOne({question: challenge.question});

    if (!existingChallenge) {
        challenge.time = '30';
        const newChallenge = await new Challenge(challenge).save();
        return newChallenge;
    } else {
        return existingChallenge;
    }
}

module.exports = {pickRandonChallenges}