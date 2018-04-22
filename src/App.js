import React, {Component} from 'react';

import MonthlyChart from './containers/MonthlyChart';
import SeasonChart from './containers/SeasonChart';
import 'bulma/css/bulma.min.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Data Visualization class - Assigment 2
                            </h1>
                        </div>
                    </div>
                </section>
                <section>
                    The data provided containes temperatures variance (expressed
                    in Celsius degree) from the 1880 to 2015: the variance has
                    been computed from a baseline average temperature recorded
                    from 1951 to 1980.
                </section>
                <section>
                    <p className="before-chart">
                        The following chart shows the variance range of
                        temperatures for the four seasons, looking at the data
                        from 1880 to 2015:
                    </p>
                    <SeasonChart />
                    <p className="after-chart">
                        The winter range is the one that was more affected by
                        the temperature change, with a range span of almost 1.5
                        ℃.
                    </p>
                </section>
                <section>
                    <p className="before-chart">
                        The data contains more detailed information for each
                        year, therefore this is a more detailed month chart that
                        can be shown:
                    </p>
                    <MonthlyChart />

                    <p className="after-chart">
                        As expected from the season chart above, winter months
                        (January and December) as the months with the biggest
                        temperature change ( more than 1.55 ℃).
                    </p>
                </section>
                <section>
                    <p className="after-chart bottom-gap">
                        Hovering the range lines or the dots a tooltip will
                        appear showing some detailed information about the data.
                        The download button will help download the processed
                        data.
                    </p>
                </section>
            </div>
        );
    }
}

export default App;
