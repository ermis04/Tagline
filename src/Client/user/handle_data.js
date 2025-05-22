class User {
    constructor(first_name, last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
    }
}

fetch('http://localhost:3000/api/persons')
    .then(res => res.json())
    .then(data => {
        console.log('Raw data:', data);
        return data.map(u => new User(u.first_name, u.last_name));
    })
    .then(data => {
        const users = data.map(u => new User(u.first_name, u.last_name));
        console.log('User objects:', users);
        console.log("test; ", users[0].first_name);
    })
    .catch(console.error);

