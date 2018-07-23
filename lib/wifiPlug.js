const axios = require('axios');
const uuidv4 = require('uuidv4');

const apiUrl = process.env.TPLINK_URL;

module.exports = class WifiPlug {
  async connect() {
    const { token } = this;

    if (!token) {
      const { TPLINK_USERNAME: cloudUserName, TPLINK_PASSWORD: cloudPassword } = process.env;
      const appType = 'Kasa_Android',
        terminalUUID = uuidv4();

      const loginResponse = await axios.post(apiUrl, {
        method: 'login',
        params: {
          appType,
          cloudUserName,
          cloudPassword,
          terminalUUID
        }
      });

      this.token = loginResponse.data.result.token;

      const deviceListResponse = await axios.post(apiUrl, { method: 'getDeviceList' });

      const { result } = deviceListResponse.data;
      const { deviceList } = result;
      const [device] = deviceList;

      this.device = device;
    }
  }

  turnOn() {
    return this.toggle(true);
  }

  turnOff() {
    return this.toggle(false);
  }

  toggle(state = !this.device.status) {
    this.device.status = state;
    return axios.post(apiUrl, {
      method: 'passthrough',
      params: {
        deviceId: this.device.deviceId,
        requestData: JSON.stringify({
          system: {
            set_relay_state: { state: Number(state) }
          }
        })
      }
    });
  }
}