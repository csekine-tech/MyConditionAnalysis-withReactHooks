import Calender from "./components/Calender";
import ConditionListProvider from "./store/ConditionListProvider";
import CorrelationCoefficientModule from "./components/CorrelationCoefficientModule";

function App() {
  const setAvailableDateList=()=>{

  }
  return (
    <>
      <ConditionListProvider>
        <h1>気圧相関チェッカー</h1>
        <p>体調と気圧の相関を調べることができます。あなたの過去の体調を5日以上入力してください。</p>
        <Calender useEffectHandler={setAvailableDateList}/>
        <CorrelationCoefficientModule />
      </ConditionListProvider>
    </>
  );
}

export default App;
