import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import './forecast.css';

function dayOfTheWeek(timestamp){
    const date = new Date(timestamp * 1000);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = date.getDay();
    return daysOfWeek[day];
}

const Forecast = ({ data }) => {

    const dailyForecast = data.list.reduce((acc, curr) => {
        const date = new Date(curr.dt * 1000).toLocaleDateString();
        const time = new Date(curr.dt * 1000).getHours();
        if (!acc[date] || time === 12) {
            acc[date] = curr;
        }
        console.log(acc);
        return acc;
    }, {});

    const dailyForecastArray = Object.values(dailyForecast);

    return (
        <div className="forecast">
            <h2>Forecast for {data.city.name}</h2>
            <Accordion allowZeroExpanded>
                {dailyForecastArray.map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {dayOfTheWeek(item.dt)} - {item.weather[0].description}
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="forecast-item">

                                <img alt="Weather" src={`icons/${item.weather && item.weather[0].icon}.png`} />

                                <p>Temp: {Math.round(item.main.temp - 273.15)}°C</p>
                                <p>Feels like: {Math.round(item.main.feels_like - 273.15)}°C</p>
                                <p>Wind: {item.wind.speed} m/s</p>
                                <p>Humidity: {item.main.humidity}%</p>
                                <p>Pressure: {item.main.pressure} hPa</p>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default Forecast;
