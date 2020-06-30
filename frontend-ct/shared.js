import Constants from "expo-constants";

const {manifest} = Constants;
export const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? 'http://' + manifest.debuggerHost.split(`:`).shift().concat(`:3000/api/v1/`)
    : `http://api.example.com`;

// production api goes here by env var
