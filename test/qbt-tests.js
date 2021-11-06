const assert = require("assert");
const api = require("../src/qbt");
require('dotenv').config({paht: '../.env'});
api
  .connect(process.env.HOST, process.env.USER, process.env.PASS)
  .then((qbt) => {
    // Application methods
    qbt
      .appVersion()
      .then((version) => assert(version.startsWith("v")))
      .catch((err) => assert.ifError(err));
    qbt
      .apiVersion()
      .then((version) => assert(version))
      .catch((err) => assert.ifError(err));
    qbt
      .buildInfo()
      .then((info) => assert(info.qt))
      .catch((err) => assert.ifError(err));
    qbt
      .defaultSavePath()
      .then((path) => assert(path))
      .catch((err) => assert.ifError(err));
    qbt
      .preferences()
      .then((preferences) => assert(preferences.locale))
      .catch((err) => assert.ifError(err));
    // Transfer info methods
    qbt
      .transferInfo()
      .then((info) => assert(info.connection_status))
      .catch((err) => assert.ifError(err));
    qbt
      .speedLimitsMode()
      .then((enabled) => assert(!isNaN(enabled)))
      .catch((err) => assert.ifError(err));
    qbt
      .globalDownloadLimit()
      .then((limit) => assert(!isNaN(limit)))
      .catch((err) => assert.ifError(err));
    qbt
      .globalUploadLimit()
      .then((limit) => assert(!isNaN(limit)))
      .catch((err) => assert.ifError(err));
    // Torrent management methods
    qbt
      .torrents()
      .then((torrents) => {
        const torrent = torrents[0];
        qbt
          .properties(torrent.hash)
          .then((properties) => assert(properties.creation_date))
          .catch((err) => assert.ifError(err));
        qbt
          .trackers(torrent.hash)
          .then((trackers) => assert(trackers.length > 0))
          .catch((err) => assert.ifError(err));
        qbt
          .webseeds(torrent.hash)
          .then((webseeds) => assert(webseeds))
          .catch((err) => assert.ifError(err));
        qbt
          .files(torrent.hash)
          .then((contents) => assert(contents.length > 0))
          .catch((err) => assert.ifError(err));
        qbt
          .pieceStates(torrent.hash)
          .then((states) => assert(states.length > 0))
          .catch((err) => assert.ifError(err));
        qbt
          .pieceHashes(torrent.hash)
          .then((hashes) => assert(hashes.length > 0))
          .catch((err) => assert.ifError(err));
      })
      .catch((err) => assert.ifError(err));
    qbt
      .categories()
      .then((categories) => assert(categories))
      .catch((err) => assert.ifError(err));
    qbt
      .tags()
      .then((tags) => assert(tags))
      .catch((err) => assert.ifError(err));
    qbt
      .searchPlugins()
      .then((plugins) => assert(plugins))
      .catch((err) => assert.ifError(err));
  })
  .catch((err) => assert.ifError(err));
