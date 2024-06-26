export const COLORS={
    BgColor:'#E0E0E0'
}

export const textColor = "#2F80ED";


export const GETSTATUSCOLOR = (status: string) => {
    switch (status) {
      case "Recovered":
        return "#a0d4b6";
      case "Ontreatment":
        return "#b6d3f9"; 
      case "Awaitingsurgery":
        return "#f8c4c4"; 
      default:
        return "#ffffff"; 
    }
  };
  export const GetStatusTextColor = (status: string) => {
    switch (status) {
      case "Recovered":
        return "#27AE60"; 
      case "Ontreatment":
        return "#2F80ED"; 
      case "Awaitingsurgery":
        return "#EB5757"; 
      default:
        return "#ffffff"; 
    }
  };