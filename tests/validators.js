// npm install --save-dev jest

const CheckName = (username) => /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(username);

const CheckEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const CheckUsername = (username) => /^[a-zA-Z][a-zA-Z0-9]*$/.test(username);

const CheckPoints = (points) => Number.isInteger(points);

const CheckPhone = (phone) => /^\+\d{2}\s?\d{10}$/.test(phone);

const CheckLocationName = (location) => /^[a-zA-Z][a-zA-Z0-9]{0,29}$/.test(location);



module.exports = {
    CheckName: CheckName,
    CheckEmail,
    CheckUsername,
    CheckPoints,
    CheckLocationName,
    CheckPhone
};