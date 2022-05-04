"use strict";

const url = require("url");

const zerofill = (nb, minLength) => nb.toString().padStart(minLength, '0')
const datasets = [];
const labels = [];

for (let i = 1; i < 13; i++) {
  const month = zerofill(i, 2);
  labels.add(month);
  const uriString = "https://cloud.iexapis.com/v1/sql-query/KC?token=sk_7c2ccfe895fb4231a5366e61afb4de5f&sqlQuery=SELECT concat(round((((`2020-" + month + "` - `2020-" + (month + 1) + "`) / `2020-" + month + "`) * 100), 2), '%') as pctChange FROM kc.median_asking_rent_all WHERE borough = 'manhattan' AND areaName = 'All Downtown';";
  const covidYearData = url(encodeURI(uriString));
  datasets.add({
      label: `Percentage Change ${i}`,
      data: covidYearData,
    });
}

<canvas id="myChart" width="400" height="400"></canvas>
<script>
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type = "line",
    data = {
      labels: labels,
      datasets: datasets,
    }
  });
</script>
