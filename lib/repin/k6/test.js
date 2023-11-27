import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(90)<1000'], // 95% of requests should be below 500ms
        "http_reqs{status:200}": ["count>0"],
        "http_reqs{status:400}": ["count==0"],
        "http_reqs{status:500}": ["count==0"],
        "http_reqs{status:404}": ["count==0"],
    },
    scenarios: {
        // limits: {
        //     executor: 'ramping-arrival-rate',
        //     timeUnit: '1m',
        //     startRate: 100,
        //     preAllocatedVUs: 200,
        //     stages: [
        //         // Start 2500 iterations per `timeUnit` for the first 30 second.
        //         { target: 6000, duration: '1m' },
        //         // Linearly ramp-up to starting 10000 iterations per `timeUnit` over the following 30 second.
        //         { target: 12000, duration: '1m' },
        //         // { target: 10000, duration: '2m' },
        //     ],
        //     maxVUs: 500,
        // }
        contacts: {
            executor: 'constant-arrival-rate',
            // How long the test lasts
            duration: '2m',
            // How many iterations per timeUnit
            rate: 100,
            // Start `rate` iterations per second
            timeUnit: '1s',
            // Pre-allocate VUs
            preAllocatedVUs: 50,
            maxVUs: 500,
        }
    }
};

export default function () {
    const url = 'http://localhost:1323/?template=guides&prefix=Короче&name=Санкт-Петербург&image=https://photo.hotellook.com/static/cities/388x388/LED.jpg&layer=Неочевидные%20советы&count=10%20подборок%20от%20местных&walk=Прогулка%20по%20городу';

    const params = {
        timeout: '2s'
    };

    http.get(url, params);
}


