
const url = "https://distribuidas-school.herokuapp.com";


//Bill
const urlGetBill = "/api/getBill";          // Get All Bills
const urlUpdateBill = "/api/updateBill";    // Update Bill (for set Pay= true for example)


//Additionals
const urlGetAdditionalbyType = "/api/getAdditionalbyType";          // Get All Bills
// const urlUpdateBill = "/api/updateBill";    // Update Bill (for set Pay= true for example)

export const getBill = async () => {
    const endpoint = `${url}${urlGetBill}`;
    let response = await fetch(endpoint);
    let responseData = await response.json();
    return responseData;
};

export const getAdditionalbyType = async (type) => {
    const endpoint = `${url}${urlGetAdditionalbyType}`;
    let data = {'type': type};
    let response = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    let responseData = await response.json();
    return responseData;
};