var genRandomPoints = require('random-points-on-polygon');
const helpers = require('@turf/helpers');
const bbox = require('@turf/bbox');

const randomPointsPolygon = (numberOfChallenges, gameArea) => {
    const points = gameArea.coordinates;
    points.push(gameArea.coordinates[0]);

    const polygon = helpers.polygon([points]);

    const randomPoints = genRandomPoints(numberOfChallenges, polygon);
    return parseData(randomPoints);
}

const parseData = (points) => {
    const result = [];

    for (const f of points) {
        result.push(f.geometry);
    }

    return result;
}

module.exports = randomPointsPolygon
