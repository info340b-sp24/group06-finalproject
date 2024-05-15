import React, { act, useState } from 'react';
import options from '../../data/options.json'
export { ClothesList };

function ClothesList(props) {

    const [category, setCategory] = useState('');
    const [weather, setWeather] = useState('');
    const [occasion, setOccasion] = useState('');
    const [aesthetic, setAesthetic] = useState('');

    const handleFilterChange = (newCategory, newWeather, newOccasion, newAesthetic) => {
        setCategory(newCategory);
        setWeather(newWeather);
        setOccasion(newOccasion);
        setAesthetic(newAesthetic);
        props.applyFilterCallback(newCategory, newWeather, newOccasion, newAesthetic);
    };

    const clothesArray = props.data.map(obj => (
        <div className="clothing-item" key={obj.id}>
            <img src={obj.img} alt={obj.alt} />
        </div>
    ));

    const weatherOptions = options.filterOptions
        .filter(obj => obj.id === "weather")
        .flatMap(obj => obj.options);

    const occasionOptions = options.filterOptions
        .filter(obj => obj.id === "occasion")
        .flatMap(obj => obj.options);

    const aestheticOptions = options.filterOptions
        .filter(obj => obj.id === "aesthetics")
        .flatMap(obj => obj.options);

    const categoryOptions = options.filterOptions
        .filter(obj => obj.id === "category")
        .flatMap(obj => obj.options);

    const categoryOptionsArray = categoryOptions.map(option => (
        <SortCategory
            key={option.value}
            active={category == option.value}
            label={option.label}
            name={option.value}
            onClick={() => handleFilterChange(option.value, weather, occasion, aesthetic)}
        />
    ))

    return (<div className="closet-intro">
        <div className="scrollmenu">
            {categoryOptionsArray}
        </div>

        {/* Did not map the Filter level, since individual Filter need to return the value to callbackfunction  */}
        <div className="scrollmenu">
            <FilterPill
                id="weather"
                name="Weather"
                value={weather}
                onChange={e => handleFilterChange(category, e.target.value, occasion, aesthetic)}
                options={weatherOptions}
            />
            <FilterPill
                id="occasion"
                name="Occasion"
                value={occasion}
                onChange={e => handleFilterChange(category, weather, e.target.value, aesthetic)}
                options={occasionOptions}
            />
            <FilterPill
                id="aesthetic"
                name="Aesthetic"
                value={aesthetic}
                onChange={e => handleFilterChange(category, weather, occasion, e.target.value)}
                options={aestheticOptions}
            />
        </div>

        <div className='closet'>
            {clothesArray}
        </div>
    </div>
    )
}

function SortCategory(props) {
    let iconclassName = "";
    if (props.active) { iconclassName += 'selected-item' }

    return (
        <div className={"item" + iconclassName}>
            {props.active && <img src="icon/pin.svg" alt="pin" />}
            <a onClick={props.onClick}>{props.label}</a>
        </div>
    )
}

function FilterPill({ id, name, value, onChange, options }) {
    return (
        <div className="filter-pill">
            <select id={id} name={name} value={value} onChange={onChange}>
                <option value="">{name}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default FilterPill;