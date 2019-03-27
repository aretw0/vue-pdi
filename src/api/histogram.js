const greyLevels = new Array(255).fill(0).map((e,i)=>i);
const Histogram = {
  mapValues(values) {
    return greyLevels.map(m => {
      return {
        'level': m,
        'amount': values[m]
      }
    }) 
  },
  mapTwoValues(val1,val2) {
    return greyLevels.map(m => {
      return {
        'level': m,
        'amount1': val1[m],
        'amount2': val2[m]
      }
    }) 
  }
}

export default Histogram;