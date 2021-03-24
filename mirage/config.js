import ENV from 'ping-pong-tournament-client/config/environment';

export default function () {
  this.urlPrefix = `${ENV.api.host}/${ENV.api.namespace}`;
}
