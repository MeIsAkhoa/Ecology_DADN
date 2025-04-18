export const API_ENDPOINTS = {
    // User API
    USER_REGISTER: "/user",
    USER_PROFILE: "/user/profile",
    USER_UPDATE: "/user", // Added for PUT endpoint
    LOGIN: "/auth/token",
    LOGOUT: "/auth/logout",

    // Sensor Data API
    SENSOR_LATEST: "/adafruit/latest",
    SENSOR_TEMPERATURE: "/adafruit/data/temperature",
    SENSOR_HUMIDITY: "/adafruit/data/humidity",
    SENSOR_LIGHT: "/adafruit/data/light",
    SENSOR_SOIL_MOISTURE: "/adafruit/data/soil-moisture",
  
    // Device Control API
    CONTROL_WATER_PUMP: "/adafruit/control/water-pump",
    CONTROL_RELAY: "/adafruit/control/relay",
    CONTROL_LED: "/adafruit/control/led",
};