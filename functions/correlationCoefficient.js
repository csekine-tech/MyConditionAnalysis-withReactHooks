const correlationCoefficient = (data1, data2) => {
  const avr = (data) => {
    const length = data.length;
    const sum = data.reduce((sum, element) => {
      return sum + parseFloat(element);
    }, 0);
    return sum / length;
  };

  const dispersion = (data) => {
    const length = data.length;
    const avrage = avr(data);
    const sum = data.reduce((sum, element) => {
      return sum + Math.pow(parseFloat(element) - avrage, 2);
    }, 0);
    return Math.sqrt(sum / length);
  };

  const covariance = (data1, data2) => {
    const avr1 = avr(data1);
    const avr2 = avr(data2);
    const length = Math.min(data1.length, data2.length);
    let result = 0;
    for (let i = 0; i < length; i++) {
      result =
        result + (parseFloat(data1[i]) - avr1) * (parseFloat(data2[i]) - avr2);
    }
    if (length !== 0) {
      return result / length;
    } else {
      return false;
    }
  };

  const R = covariance(data1, data2) / dispersion(data1) / dispersion(data2);

  return R;
};

export default correlationCoefficient;
