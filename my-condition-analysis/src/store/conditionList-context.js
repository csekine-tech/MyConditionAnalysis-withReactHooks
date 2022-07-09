import React from "react";

const ConditionListContext = React.createContext({
  events: [],
  addEvent: (event) => {},
  removeEvent: (date) => {},
  editEvent:(event)=>{},
  setAllEvent:(events)=>{}
});

export default ConditionListContext;
