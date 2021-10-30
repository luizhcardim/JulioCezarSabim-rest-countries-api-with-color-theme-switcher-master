import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Country from './Country'
import api from '../services/api'
import { v4 as uuidv4 } from 'uuid';
import './styles/CountryList.css'
import FilterBar from './FilterBar';

const CountryList = props => {

    const [countries, setCountries] = useState()
    const [filteredCountries, setFilteredCountries] = useState()

    useEffect(() => {
        api
            .get('/all')
            .then(response => setCountries(response.data))
            .catch(error => console.log(error))
    }, [])

    // const filteredCountries = countries?.filter(country => {
    //     return country.name.toLowerCase().includes(searchTerm.toLowerCase())
    // })

    function filterFunction(filter){
        const filtered = countries?.filter(country => {
            return country.name.toLowerCase().includes(filter.toLowerCase())
        })
        setFilteredCountries(filtered)
    }

    // const getBorderCountriesFullName = (country) => {
    //     let bordersList = [];

    //     country.borders?.forEach((i) => {
    //         bordersList.push({
    //             code: i,
    //             name: countries.find((c) => c.alpha3Code === i).name,
    //         })
    //     });

    //     countries.find((c) => c.alpha3Code === country.alpha3Code).borderList = bordersList

    //     console.log(country.borderList)

    //     return country;
    // };

    const listCountries = filteredCountries ? filteredCountries : countries

    return (
        <div className="countryList">
            <FilterBar filter_function={filterFunction}/>

            {listCountries?.map(item => {
                // item = getBorderCountriesFullName(item);
                return (<Link to={item.alpha3Code} key={uuidv4()} className="link" >
                    <Country data={item} />
                </Link>)
            })}
        </div>
    )
}

export default CountryList





// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import Country from "./Country";
// import api from "../services/api";
// import { v4 as uuidv4 } from "uuid";
// import "./styles/CountryList.css";

// const CountryList = (props) => {
//   let [countries, setCountries] = useState([]);

//   useEffect(() => {
//     api
//       .get("/all")
//       .then((response) => setCountries(response.data))
//       .catch((error) => console.log(error));
//   }, []);

//   const getBorderCountriesFullName = (country) => {
//     let bordersList = [];

//     country.borders?.forEach((i) => {
//       bordersList.push({
//         code: i,
//         name: countries.find((c) => c.alpha3Code === i).name,
//       })
//     });

//     countries.find((c) => c.alpha3Code === country.alpha3Code).borderList = bordersList

//     return country;
//   };

//   return (
//     <div className="countryList">
//       {countries?.map((country) => {
//         country = getBorderCountriesFullName(country);

//         return (
//           <Link to={country.alpha3Code} key={uuidv4()} className="link">
//             <Country data={country} />
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default CountryList;
