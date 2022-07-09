import { useState, useContext } from "react";
import ConditionListContext from "../store/conditionList-context";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import ButtonWrapper from "../UI/ButtonWrapper";

const conditionIndex = {
  1: { number: 1, id: "verybad", text: "very bad" },
  2: { number: 2, id: "bad", text: "bad" },
  3: { number: 3, id: "good", text: "good" },
  4: { number: 4, id: "verygood", text: "very good" },
};

const MyConditionModal = (props) => {
  const conditionListCtx = useContext(ConditionListContext);

  //すでにイベントがあったら
  const key = conditionListCtx.events.findIndex(
    (event) => event.start === props.date
  );
  const existingEventCondition =
    key !== -1 ? conditionListCtx.events[key].id : "";

  const defaultSelectedCondition = {
    id: existingEventCondition,
    title: key!==-1 ? conditionIndex[existingEventCondition].text:'',
    start: props.date,
  };

  const [selectedCondition, setSelectedCondition] = useState(
    defaultSelectedCondition
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (existingEventCondition === "") {
      conditionListCtx.addEvent(selectedCondition);
    } else {
      conditionListCtx.editEvent(selectedCondition);
    }
    props.onClose();
  };
  const radioChangeHandler = (e) => {
    setSelectedCondition({
      id: Number(e.target.value),
      title: conditionIndex[Number(e.target.value)].text,
      start: props.date,
    });
  };

  const removeEventHandler = (e) => {
    e.preventDefault();
    props.onClose();
    conditionListCtx.removeEvent(props.date);
  };

  return (
    <Modal onClose={props.onClose}>
      <h3>{props.date}</h3>
      <form onSubmit={submitHandler}>
        {Object.keys(conditionIndex).map((index) => (
          <div key={conditionIndex[index].number}>
            <input
              type="radio"
              id={conditionIndex[index].id}
              name={conditionIndex[index].id}
              value={conditionIndex[index].number}
              checked={selectedCondition.id=== conditionIndex[index].number}
              onChange={radioChangeHandler}
            />
            <label htmlFor={conditionIndex[index].id}>
              {conditionIndex[index].text}
            </label>
          </div>
        ))}
        <ButtonWrapper>
        {existingEventCondition && (
            <Button onClick={removeEventHandler}>remove</Button>
          )}
          <Button type="submit">submit</Button>
        </ButtonWrapper>
      </form>
    </Modal>
  );
};
export default MyConditionModal;
