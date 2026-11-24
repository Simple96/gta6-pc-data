# GTA6Tools PC checker data

An independent, fan-made hardware comparison model for the GTA6Tools PC checker and FPS calculator. Use it to explore what changes when you switch one component, resolution or preset. Every FPS range in this repository is an estimate. The bands are modeling choices and have not been validated against GTA VI PC measurements.

## Reproduce a result

Download `hardware.json` and `estimate.mjs` into the same folder. Run the following with Node.js 20 or later. The script reads the local dataset and prints JSON. It needs no packages or network connection.

```sh
node estimate.mjs --gpu 'GeForce RTX 3060 Ti' --cpu 'Ryzen 5 5600' --ram 16 --resolution 1080p --preset High
```

This example returns an estimated **40–80 FPS**, the verdict **Likely smooth**, and **Graphics card** as the limiting component. Change only `1080p` to `1440p` and the same build returns **30–60 FPS** and **Playable with compromises**.

## Read the tables

| Field in [hardware.json](hardware.json) | How it is used |
| --- | --- |
| `gpus`, `gpuBands` | Each of the 28 desktop graphics cards selects a zero-based index into the GPU band table. |
| `cpus`, `cpuBands` | Each of the 15 desktop processors selects a zero-based index into the CPU band table. |
| `memoryCaps` | Installed system memory in GB selects a ceiling for the estimate. |
| `resolutions`, `presets` | The selected resolution and quality multiply the graphics band. The CPU and memory ceilings stay fixed. |

Use the smallest of the adjusted graphics band, CPU band and memory ceiling as the center. Multiply it by 0.70 and 1.30, rounding the low end down and the high end up to multiples of five. The verdict uses the center before rounding. A center of at least 60 yields “Likely smooth”, 30 to below 60 yields “Playable with compromises”, and below 30 yields “Below target”. If ceilings tie, the checker names memory first, then the processor, then graphics. The width of the range is an editorial allowance. Its statistical coverage is unknown.

## Sources and scope

[CD Projekt Red's published PC targets](https://www.cyberpunk.net/en/news/48271/update-to-pc-system-requirements) and TechSpot's [Phantom Liberty GPU tests](https://www.techspot.com/review/2743-cyberpunk-phantom-liberty-benchmark/) and [GeForce generation comparison](https://www.techspot.com/review/3012-nvidia-geforce-rtx-60-class/) provide context about other PC workloads. GTA6Tools chose the tier assignments, multipliers and verdict boundaries. The JSON contains no benchmark results copied from those publications. Laptop power limits, upscaling, frame generation and ray tracing have no separate inputs.

The data and script are released under the [MIT License](LICENSE). To cite a particular result, use a GitHub commit permalink and include the five input settings alongside the range.

Try the browser tools at [GTA6Tools](https://gta6tools.app/).
