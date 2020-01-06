import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";
import { Tweet } from "../model/Tweet";
import Card from "react-bootstrap/Card";

export default Doughnut;
type Props = {
  tweets: Array<Tweet>;
};

export function Doughnut({ tweets }: Props) {
  let [state, setState] = React.useState<{ chartOptions: Highcharts.Options }>({
    chartOptions: {
      title: {
        text: "Sentiments stats"
      },
      series: [
        {
          type: "pie",
          name: "Browser share",
          data: [
            ["Very negative,", Math.random() * 10],
            ["negative", 5],
            ["neutral", 10],
            ["positive", 7],
            ["very positive", 0]
          ]
        }
      ]
    }
  });

  let updateSeries = (
    tweets: Array<Tweet>,
    state: { chartOptions: Highcharts.Options }
  ) => {
    const grouped = _.groupBy(tweets, "sentimentType");
    const mapped = _.mapValues(grouped, t => t.length);
    // The chart is updated only with new options.
    setState({
      ...state,
      chartOptions: {
        ...state.chartOptions,
        series: [
          {
            type: "pie",
            name: "Browser share",
            data: [
              ["Very negative,", mapped["0"] || 0],
              ["negative", mapped["1"] || 0],
              ["neutral", mapped["2"] || 0],
              ["positive", mapped["3"] || 0],
              ["very positive", mapped["4"] || 0]
            ]
          }
        ]
      }
    });
  };

  React.useEffect(() => {
    updateSeries(tweets, state);
  }, [tweets]);
  return (
    <Card>
      <HighchartsReact highcharts={Highcharts} options={state.chartOptions} />
    </Card>
  );
}
