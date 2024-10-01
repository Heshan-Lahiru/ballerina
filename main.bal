import ballerina/http;

configurable string apiKey = "API_Key";
configurable string baseUrl = "http://api.weatherapi.com/v1";

service / on new http:Listener(8081) {
    resource function get weather(string city) returns json|error {
        if (city.trim().length() == 0) {
            return error("City is required");
        }

        http:Client weatherClient = check new (baseUrl);
        json response = check weatherClient->get(string `/current.json?key=${apiKey}&q=${city}`);
        
        return response;
    }
}
