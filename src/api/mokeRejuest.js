export function mockRequest(data, timeOut = 700) {
    const request = new Promise((resolve, reject) => {
      const response = {
        status: 200,
        data,
      };
  
      setTimeout(() => {
        resolve(response);
      }, timeOut);
    });
  
    return request;
  }
  