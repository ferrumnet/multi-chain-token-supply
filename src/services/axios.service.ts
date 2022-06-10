import axios from "axios";

const supplyRequest = async (token: any): Promise<any> => {
  const response = await axios.get(token.getUrl());
  let supply = "0";
  if (response.status === 200) supply = response.data.result;
  return { supply, token };
};

export default {
  supplyRequest,
};
