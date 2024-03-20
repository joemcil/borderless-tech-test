import { useEffect, useState } from "react";
import './App.css';

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
        <div className="container">
            <div className="banner">
                <h1>Direct Candidates</h1>
                <p className="subtitle">These candidates have applied to you directly</p>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <select onChange={handleGenderFilterChange} className="filter-select">
                    <option value="">Filter by Gender</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                </select>
                <select onChange={handleCountryFilterChange} className="filter-select">
                    <option value="">Filter by Country</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="fr">France</option>
                    <option value="de">Germany</option>
                    <option value="jp">Japan</option>
                </select>
            </div>

            <div className="card-container">
                {filteredUsers.map(user => (
                    <div className="card" key={user.id}>
                        <img src={user.image} alt={user.name} className="card-image"/>
                        <div className="card-info">
                            <h2 className="card-name">
                                {user.name}
                                <img src={user.flag} alt="Country Flag" className="card-flag" />
                            </h2>
                            <div className="card-verified-badge">
                                BORDERLESS VERIFIED
                            </div>
                            <div className="card-detail">
                                <span className="card-detail-key">Location</span>
                                <span className="card-detail-value">{user.address.city}</span>
                            </div>
                            <div className="card-detail">
                                <span className="card-detail-key">Company</span>
                                <span className="card-detail-value">{user.company.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
