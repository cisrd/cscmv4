"use client";

import "@progress/kendo-theme-default/dist/all.css";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
} from "@progress/kendo-react-scheduler";
import React from "react";
import {
  sampleData,
  displayDate,
  sampleDataWithResources,
} from "./sample/data";

const DeliverySchedule = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 bg-white p-3 rounded-s-sm">
        <div className=" w-full h-full">
          <Scheduler
            data={sampleDataWithResources}
            defaultView="week"
            defaultDate={displayDate}
            height={"820px"}
          >
            <DayView startTime="07:00" />
            <WeekView />
            <MonthView />
          </Scheduler>
        </div>
      </div>
    </div>
  );
};

export default DeliverySchedule;
