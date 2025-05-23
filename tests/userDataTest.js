const CheckName = (username) => {
    const usernameRegex = /^[a-zA-Z_]+$/;
    return usernameRegex.test(username);
}

const CheckEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const CheckUsername = (username) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    return usernameRegex.test(username);
}

const CheckPoints = (points) => {
    return Number.isInteger(points);
}

const CheckLocationName = (location) => {
    const locationRegex = /^[a-zA-Z][a-zA-Z0-9]*{0, 29}$/;
    return locationRegex.test(location);
}