import {
  useCallback,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import MyConditionModal from "./MyConditionModal";
import ConditionListContext from "../store/conditionList-context";
import "./Calender.css";
import axios from "axios";

let availableDateList = [];
let data=[];

const Calender = () => {
  const conditionListCtx = useContext(ConditionListContext);
  const [ModalIsShown, setModalIsShown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const formattedDate = (date) => {
    const newDate = new Date(date);
    let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    let day = ("0" + newDate.getDate()).slice(-2);
    return newDate.getFullYear() + "-" + month + "-" + day;
  };
  const setAvailableDateListClass = () => {
    availableDateList.map((availableDate) =>
      document
        .querySelectorAll('[data-date="' + availableDate + '"]')
        .forEach((date) => date.classList.add("available"))
    );
  };
  useLayoutEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        "https://csweb.tech/app/my_condition_analysis/data/data/formattedData.json"
      );
      data = await res.data;
      data.map((e) => availableDateList.push(e.date));
    };
    fetchData();
    setAvailableDateListClass();
  }, []);

  useEffect(() => {
    localStorage.setItem("conditionList", JSON.stringify(conditionListCtx));
  }, [conditionListCtx]);

  const calenderRenderHandling = (e) => {
    setAvailableDateListClass();
  };

  const handleDateClick = useCallback((e) => {
    let isAvailable = availableDateList.indexOf(e.dateStr);
    if (isAvailable !== -1) {
      setModalIsShown(true);
      setSelectedDate(e.dateStr);
    }
  }, []);

  const handleEventClick = (e) => {
    if (e.el.classList.contains("fc-daygrid-event")) {
      const clickedFormattedDate = formattedDate(new Date(e.event.start));
      setSelectedDate(formattedDate(clickedFormattedDate));
      setModalIsShown(true);
    }
  };
  const hideModalHandler = () => {
    setModalIsShown(false);
  };
  let callenderEvents = [];
  callenderEvents.push(...conditionListCtx.events);

  return (
    <>
      {ModalIsShown && (
        <MyConditionModal onClose={hideModalHandler} date={selectedDate}/>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={callenderEvents}
        eventOverlap={false}
        datesSet={calenderRenderHandling}
      />
    </>
  );
};
export default Calender;
