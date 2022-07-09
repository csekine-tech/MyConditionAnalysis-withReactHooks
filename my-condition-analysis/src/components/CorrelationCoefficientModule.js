import { useState, useContext, useEffect, useLayoutEffect } from "react";
import CorrelationCoefficientModal from "./CorrelationCoefficientModal";
import correlationCoefficient from "../functions/correlationCoefficient";
import ConditionListContext from "../store/conditionList-context";
import Button from "../UI/Button";
import ButtonWrapper from "../UI/ButtonWrapper";
import axios from "axios";

const CorrelationCoefficientModule = () => {
  const conditionListCtx = useContext(ConditionListContext);
  const conditions = conditionListCtx.events;
  const [R, setR] = useState();
  const [resultConditions, setResultConditions] = useState();
  const [resultPressures, setResultPressures] = useState();
  const [pressures, setPressures] = useState();

  useLayoutEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        "https://csweb.tech/app/my_condition_analysis/data/data/formattedData.json"
      );
      let data = res.data;
      setPressures(data);
    };
    fetchData();
  }, []);

  const filteringData = (conditions, pressures) => {
    //日付が等しいもののみ取り出す
    let updatedConditions = [];
    let updatedPressures = [];
    [updatedConditions, updatedPressures] = conditions.map((condition) => {
      let index = pressures.findIndex(
        (pressure) => pressure.date === condition.start
      );
      if (index !== -1) {
        updatedPressures.push(pressures[index].pressure);
        updatedConditions.push(condition.id);
      }
      return [updatedConditions, updatedPressures];
    });
    setResultConditions(updatedConditions);
    setResultPressures(updatedPressures);
    return [updatedConditions, updatedPressures];
  };

  const caluculateHandler = () => {
    let [inputData] = filteringData(conditions, pressures);
    if(correlationCoefficient(inputData[0], inputData[1])){
      setR(correlationCoefficient(inputData[0], inputData[1]).toFixed(2));
      return true;
    }
    return false;
  };
  const [ModalIsShown, setModalIsShown] = useState(false);
  const handleButtonClick = () => {
    if (conditionListCtx.events.length > 4) {
      if(caluculateHandler()){
        caluculateHandler();
        setModalIsShown(true);
      }else{
        alert("正しい値を取得できませんでした。その他の体調を入力してください。")
      }
    } else {
      alert("入力データ数が足りません");
    }
  };
  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  return (
    <>
      {ModalIsShown && (
        <CorrelationCoefficientModal onClose={hideModalHandler} R={R} />
      )}
      <ButtonWrapper>
        <Button onClick={handleButtonClick}>相関を調べる</Button>
      </ButtonWrapper>
    </>
  );
};
export default CorrelationCoefficientModule;
