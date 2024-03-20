import React, { useState, useEffect } from 'react';
import './App.css';
import UserCard from './UserCard';
import SearchNFilter from './SearchNFilter';
import Container from './Container';
import Banner from './Banner';

const App = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');

    useEffect(() => {
        const countryCodes = ['us', 'ca', 'fr', 'de', 'jp'];

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                const usersWithFixedFlagsAndImages = data.map(user => {
                    const countryCode = countryCodes[user.id % countryCodes.length];
                    const genderPath = user.id % 2 === 0 ? 'men' : 'women';
                    const imageIndex = user.id % 100;

                    return {
                        ...user,
                        image: `https://randomuser.me/api/portraits/${genderPath}/${imageIndex}.jpg`,
                        flag: `https://flagcdn.com/16x12/${countryCode}.png`,
                        gender: genderPath,
                        country: countryCode,
                    };
                });
                setUsers(usersWithFixedFlagsAndImages);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleGenderFilterChange = (e) => {
        setGenderFilter(e.target.value);
    };

    const handleCountryFilterChange = (e) => {
        setCountryFilter(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery) &&
        (genderFilter === '' || user.gender === genderFilter) &&
        (countryFilter === '' || user.country === countryFilter)
    );

    return (
        <Container>
            <Banner />
            <SearchNFilter
                onSearchChange={handleSearchChange}
                onGenderFilterChange={handleGenderFilterChange}
                onCountryFilterChange={handleCountryFilterChange}
            />
            <div className="card-container">
                {filteredUsers.map(user => <UserCard key={user.id} user={user} />)}
            </div>
        </Container>
    );
};

export default App;
