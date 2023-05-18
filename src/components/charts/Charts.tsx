import React, { useEffect, useState } from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartTitle, ChartCategoryAxisItem } from '@progress/kendo-react-charts';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';

interface CountryData {
    country: string;
    active: number;
    recovered: number;
    deaths: number;
    lat: number;
    long: number;
}

interface HistoricalData {
    cases: { [date: string]: number };
}

const LineGraph: React.FC = () => {
    const [graphData, setGraphData] = useState<HistoricalData>({ cases: {} });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
                setGraphData(response.data);
            } catch (error) {
                console.log('Error fetching graph data:', error);
            }
        };

        fetchData();
    }, []);

    const dates: any = Object.keys(graphData.cases);
    const caseCounts = Object.values(graphData.cases).map((value) => value as number);

    return (
        <Chart>
            <ChartTitle text="Cases Fluctuations" />
            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={dates} />
            </ChartCategoryAxis>
            <ChartSeries>
                <ChartSeriesItem type="line" data={caseCounts} name="Cases" />
            </ChartSeries>
        </Chart>
    );
};

const MapWithMarkers: React.FC = () => {
    const [countriesData, setCountriesData] = useState<CountryData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://disease.sh/v3/covid-19/countries');
                setCountriesData(response.data);
            } catch (error) {
                console.log('Error fetching country data:', error);
            }
        };

        fetchData();
    }, []);

    // const MapCenter = () => {
    //     const map = useMap();
    //     if (countriesData.length > 0) {
    //         const { lat, long } = countriesData[0];
    //         map.setView([lat, long], 2);
    //     }
    //     return null;
    // };
    const MapCenter = () => {
        const map = useMap();
        if (countriesData.length > 0) {
            const { lat, long } = countriesData[0];
            if (typeof lat === 'number' && typeof long === 'number') {
                map.setView([lat, long], 2);
            }
        }
        return null;
    };

    return (
        <MapContainer style={{ height: '400px', width: '100%' }}>
            <MapCenter />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {countriesData.map((country) => {
                const { lat, long } = country;
                if (lat && long) {
                    return (
                        <Marker key={country.country} position={[lat, long]}>
                            <Popup>
                                <div>
                                    <h3>{country.country}</h3>
                                    <p>Active Cases: {country.active}</p>
                                    <p>Recovered Cases: {country.recovered}</p>
                                    <p>Deaths: {country.deaths}</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                }
                return null;
            })}
        </MapContainer>
    );
};

const Charts: React.FC = () => {
    return (
        <div className="main">
            <LineGraph />
            <MapWithMarkers />
        </div>
    );
};

export default Charts;
