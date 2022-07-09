import ButtonWrapper from "../UI/ButtonWrapper";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

const getCCMessage = (CCnum) => {
  if (CCnum >= 0.9) {
    return "非常に強い相関があります";
  } else if (CCnum >= 0.7) {
    return "強い相関があります";
  } else if (CCnum >= 0.5) {
    return "相関があリます";
  } else if (CCnum >= 0.3) {
    return "非常に弱い相関があります";
  } else if (CCnum >= -0.3) {
    return "ほぼ無関係です";
  } else if (CCnum >= -0.5) {
    return "非常に弱い負相関があります";
  } else if (CCnum >= -0.7) {
    return "負相関があリます";
  } else if (CCnum >= -0.9) {
    return "強い負相関があります";
  } else {
    return "非常に強い負相関があります";
  }
};
const CorrelationCoefficientModal = (props) => {
  return (
    <>
      <Modal onClose={props.onClose}>
        <p>相関係数: {props.R}</p>
        <p>{getCCMessage(props.R)}</p>
        <ButtonWrapper>
          <Button onClick={props.onClose}>close</Button>
        </ButtonWrapper>
      </Modal>
    </>
  );
};
export default CorrelationCoefficientModal;
