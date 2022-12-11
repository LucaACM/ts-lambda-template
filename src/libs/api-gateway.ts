export const formatJSONResponse = (response: Record<string, unknown>, statusCode: number = 200) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(response),
  };
};
