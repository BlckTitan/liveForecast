import React, { useState } from 'react';
//api parameters
import { ApiLocation, ApiOptions } from '../Api/Api';
import './style/Search.scss';
import { AsyncPaginate } from 'react-select-async-paginate';

export default function Search() {

    const [search, setSearch] = useState(null)

    const loadOptions = (searchData) =>{
        //creating the correct data to feed the loadOptions of the AsyncPaginate 
        //we get the location data using GeoCities Api and create an 'options' object array of value and label
        return fetch(`${ApiLocation}/cities?minPopulation=1000000&namePrefix${searchData}`, ApiOptions)
        .then((response) => response.json())
        .then((response)=>{
                return {
                    options: response.data.map((city) =>{
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`
                        }
                    })
                }
            }
        )
        .catch((err) => console.error(err));
    }

    const handleOnChange = (searchData) => {
        //
        setSearch(searchData);
        console.log(searchData)
    }

  return (
    <div className='search_container'>
        <AsyncPaginate
            placeholder='search for city'
            value={search}
            debounceTimeout={600}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    </div>
  )
}
