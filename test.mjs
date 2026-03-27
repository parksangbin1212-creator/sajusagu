import { createChart } from '@orrery/core/ziwei';

const ziwei = createChart(1995, 9, 14, 8, 10, true);
console.log(JSON.stringify(ziwei.palaces, null, 2));