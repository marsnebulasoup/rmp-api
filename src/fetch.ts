import node_fetch from 'node-fetch';

export default typeof fetch != "undefined" ? fetch : node_fetch;