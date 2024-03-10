(function () {
    const db_info = {
        url: '127.0.0.1',
        username: 'webuser',
        password: 'tripPlannerUser',
        port: '27017',
        // port: '19956',
        database: 'TripPlanner', //TripPlanner2 - FINAL DB
        collection: 'Events'
    };
    const moduleExports = db_info;

    if (typeof __dirname != 'undefined')
        module.exports = moduleExports;
}());