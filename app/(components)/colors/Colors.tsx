export const getStatusColor = (status: string) => {
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
export const getStatusTextColor = (status: string) => {
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