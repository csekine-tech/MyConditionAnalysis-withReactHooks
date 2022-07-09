import { useReducer } from "react";

import ConditionListContext from "./conditionList-context";
const conditionListData = JSON.parse(localStorage.getItem("conditionList"));

const defaultConditionListState = conditionListData
  ? conditionListData
  : {
      events: [],
    };
const ConditionListReducer = (state, action) => {
  // console.log(conditionListData);
  if (action.type === "ADD") {
    if (action.event.title && action.event.start && action.event.id) {
      const updatedConditionList = state.events.concat(action.event);
      return {
        events: updatedConditionList,
      };
    }
  }
  if (action.type === "REMOVE") {
    const updatedConditionList = state.events.filter(
      (event) => event.start !== action.date
    );
    return {
      events: updatedConditionList,
    };
  }
  if (action.type === "EDIT") {
    let updatedConditionList = [];
    state.events.map((event) => {
      if (event.start === action.event.start) {
        updatedConditionList.push({
          id: action.event.id,
          title: action.event.title,
          start: action.event.start,
        });
      } else {
        updatedConditionList.push(event);
      }
    });
    return {
      events: updatedConditionList,
    };
  }
  if (action.type === "SETALL") {
    let updatedConditionList = [];
    if (action.events.length > 0) {
      action.events.map((event) => {
        updatedConditionList.push({
          id: event.id,
          title: event.title,
          start: event.start,
        });
      });
    }
    return {
      events: updatedConditionList,
    };
  }
  return defaultConditionListState;
};

const ConditionListProvider = (props) => {
  const [conditionListState, dispatchConditionListAction] = useReducer(
    ConditionListReducer,
    defaultConditionListState
  );

  const addEventHandler = (event) => {
    dispatchConditionListAction({ type: "ADD", event: event });
  };
  const removeEventHendler = (date) => {
    dispatchConditionListAction({ type: "REMOVE", date: date });
  };
  const editEventHandler = (event) => {
    dispatchConditionListAction({ type: "EDIT", event: event });
  };
  const setAllEventsHandler = (events) => {
    dispatchConditionListAction({ type: "SETALL", events: events });
  };

  const conditionListContext = {
    events: conditionListState.events,
    length: conditionListState.length,
    addEvent: addEventHandler,
    removeEvent: removeEventHendler,
    editEvent: editEventHandler,
    setAllEvents: setAllEventsHandler,
  };

  return (
    <ConditionListContext.Provider value={conditionListContext}>
      {props.children}
    </ConditionListContext.Provider>
  );
};
export default ConditionListProvider;
