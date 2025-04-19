'use client";'
import React from "react";
import Navbar from "./../components/nav/navbar";
import Calendar from "./../components/calendar/calendar";

const Dashboard = () => {
  return(
    <>
    <Navbar>
      <div className="relative flex h-screen max-h-screen w-full flex-col gap-4 px-4 pt-4 items-center justify-center">
      <div className="relative h-full w-full overflow-hidden rounded-lg border bg-content1  shadow-md dark:bg-[#020817]">
      <Calendar />
      </div>
      </div>
    </Navbar>
    </>
  );
};
export default Dashboard;