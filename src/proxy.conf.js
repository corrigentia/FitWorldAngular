const PROXY_CONFIG = [{
    context: ["/weatherforecast", "/api/students", "/api/auth", "/api"],
    target: "https://localhost:7076",
    //target: "https://localhost:5001",
    secure: false,
}, ];

module.exports = PROXY_CONFIG;
