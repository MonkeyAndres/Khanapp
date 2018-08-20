const buildChallenges = (challenges, points) => {
    const result = [];

    for (let i in challenges) {
        const challengeObj = {
            challenge: challenges[i],
            position: points[i]
        }
        result.push(challengeObj);
    }

    return result;
}

module.exports = buildChallenges;