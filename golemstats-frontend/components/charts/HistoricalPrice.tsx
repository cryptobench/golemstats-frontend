import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { ApexOptions } from "apexcharts";
import { fetcher } from "@/fetcher";
import { RoundingFunction } from "@/lib/RoundingFunction";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface HistoricalPriceProps {
  endpoint: string;
  allDataPoints: boolean;
  annotations: boolean;
  title: string;
  palette: string[];
  paragraph?: string;
}

export const HistoricalPriceChart: React.FC<HistoricalPriceProps> = ({
  endpoint,
  allDataPoints,
  annotations,
  title,
  palette,
  paragraph,
}) => {
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [series, setSeries] = useState<any[]>([]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      id: "area-datetime",
      type: "area",
      zoom: {
        autoScaleYaxis: true,
      },
      animations: {
        enabled: false,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
        formatter: undefined,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: palette,
    markers: {
      size: 0,
    },
    annotations: {
      xaxis: [
        {
          x: new Date("21 May 2021").getTime(),
          strokeDashArray: 0,
          borderColor: "#3F51B5",
          label: {
            borderColor: "#3F51B5",
            style: {
              color: "#fff",
              background: "#3F51B5",
            },
            text: "0.6.7 Released",
          },
        },
        {
          x: new Date("20 May 2021").getTime(),
          strokeDashArray: 0,
          borderColor: "#3F51B5",
          label: {
            borderColor: "#3F51B5",
            style: {
              color: "#fff",
              background: "#3F51B5",
            },
            text: "0.6.6 Released",
          },
        },
        {
          x: new Date("15 June 2021").getTime(),
          strokeDashArray: 0,
          borderColor: "#3F51B5",
          label: {
            borderColor: "#3F51B5",
            style: {
              color: "#fff",
              background: "#3F51B5",
            },
            text: "0.7.0 Released",
          },
        },
        {
          x: new Date("24 June 2021").getTime(),
          strokeDashArray: 0,
          borderColor: "#3F51B5",
          label: {
            borderColor: "#3F51B5",
            style: {
              color: "#fff",
              background: "#3F51B5",
            },
            text: "0.7.1 Released",
          },
        },
        {
          x: new Date("8 July 2021").getTime(),
          strokeDashArray: 0,
          borderColor: "#3F51B5",
          label: {
            borderColor: "#3F51B5",
            style: {
              color: "#fff",
              background: "#3F51B5",
            },
            text: "0.7.2 Released",
          },
        },
        {
          x: new Date("28 July 2021").getTime(),
          strokeDashArray: 0,
          borderColor: "#3F51B5",
          label: {
            borderColor: "#3F51B5",
            style: {
              color: "#fff",
              background: "#3F51B5",
            },
            text: "0.7.3 Released",
          },
        },
        {
          x: new Date("11 October 2021").getTime(),
          strokeDashArray: 0,
          borderColor: "#3F51B5",
          label: {
            borderColor: "#3F51B5",
            style: {
              color: "#fff",
              background: "#3F51B5",
            },
            text: "0.8.0 Released",
          },
        },
        {
          x: new Date("8 December 2021").getTime(),
          strokeDashArray: 0,
          borderColor: "#3F51B5",
          label: {
            borderColor: "#3F51B5",
            style: {
              color: "#fff",
              background: "#3F51B5",
            },
            text: "0.9.0 Released",
          },
        },
      ],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.2,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      title: {
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontWeight: 600,
          cssClass: "apexcharts-yaxis-title",
        },
      },
      labels: {
        formatter: function (value) {
          return value + " GLM";
        },
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        offsetX: -25,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontWeight: 600,
          cssClass: "apexcharts-yaxis-title",
        },
      },
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm:ss",
        },
      },
    },
  });

  const { data: apiResponse } = useSWR(endpoint, fetcher);

  useEffect(() => {
    if (apiResponse) {
      const start: any[] = [];
      const cpuh: any[] = [];
      const perh: any[] = [];
      const items = allDataPoints ? apiResponse : apiResponse.slice(-7);

      items.forEach((obj: any) => {
        start.push([obj.date, RoundingFunction(obj.start, 3)]);
        cpuh.push([obj.date, RoundingFunction(obj.cpuh, 3)]);
        perh.push([obj.date, RoundingFunction(obj.perh, 3)]);
      });

      setSeries([
        { data: start, name: "Start" },
        { data: cpuh, name: "CPU/h" },
        { data: perh, name: "Per/h" },
      ]);
    }
  }, [apiResponse]);

  const hideshowAnnotation = () => {
    setShowAnnotations(!showAnnotations);
    const elem = document.getElementsByClassName(
      "apexcharts-xaxis-annotations"
    );
    console.log("elem", elem);

    if (showAnnotations) {
      Array.from(elem).forEach(
        (element: any) => (element.style.visibility = "hidden")
      );
    } else {
      Array.from(elem).forEach(
        (element: any) => (element.style.visibility = "visible")
      );
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl">
      <h1 className="text-2xl font-medium dark:text-gray-300 mb-2">{title}</h1>
      {showAnnotations ? (
        <button
          aria-label="Enable or Disable Annotations"
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-2xl text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={hideshowAnnotation}
        >
          Hide Release Labels
        </button>
      ) : (
        <button
          aria-label="Enable or Disable Annotations"
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-2xl text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={hideshowAnnotation}
        >
          Show Release Labels
        </button>
      )}
      <div className="mt-4">
        <ApexCharts
          width="100%"
          height="350"
          type="area"
          options={options}
          series={series}
        />
      </div>
    </div>
  );
};

export default HistoricalPriceChart;
