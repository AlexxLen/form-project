class BX24Service {
  constructor() {}

  init(callback) {
    BX24.init(callback);
  }

  callMethod(method, params = {}) {
    return new Promise((resolve, reject) => {
      BX24.callMethod(method, params, function (result) {
        if (result.error()) {
          console.error('BX24 Error:', result.error());
          reject(result.error());
        } else {
          resolve(result.data());
        }
      });
    });
  }

  placementInfo() {
    return BX24.placement.info();
  }
}

export default new BX24Service();
