'use strict';

/**
 * This module contains the implementation of the Record&Play plugin (ref. {@link https://janus.conf.meetecho.com/docs/recordplay.html}).
 * @module videocall-plugin
 */

import Handle from 'janode/src/handle.js';

/* The plugin ID exported in the plugin descriptor */
const PLUGIN_ID = 'janus.plugin.videocall';

/* These are the requests defined for the Janus RecordPlay API */
const REQUEST_LIST = 'list';
const REQUEST_REGISTER = 'register';
const REQUEST_SET = 'set';
const REQUEST_CALL = 'call';
const REQUEST_ACCEPT = 'accept';
const REQUEST_HANGUP = 'hangup';


/* These are the events/responses that the Janode plugin will manage */
/* Some of them will be exported in the plugin descriptor */
const PLUGIN_EVENT = {
  REGISTRED: 'registered',
  CALLING: 'calling',
  INCOMMING: 'incomming',
  ACCEPTED: 'accepted',
  ERROR: 'error',
  SIMULCAST: 'simulcast',
  HANGUP: 'hangup',
  UPDATE: 'update'
};

/**
 * The class implementing the Record&Play plugin (ref. {@link https://janus.conf.meetecho.com/docs/recordplay.html}).<br>
 *
 * It extends the base Janode Handle class and overrides the base "handleMessage" method.<br>
 *
 * Moreover it defines many methods to support RecordPlay operations.
 *
 * @hideconstructor
 * @extends module:handle~Handle
 */
class VideoCallHandle extends Handle {
  /**
   * Create a Janode RecordPlay handle.
   *
   * @param {module:session~Session} session - A reference to the parent session
   * @param {number} id - The handle identifier
   */
  constructor(session, id) {
    super(session, id);
  }

  /**
   * The custom "handleMessage" needed for handling RecordPlay messages.
   *
   * @private
   * @param {Object} janus_message
   * @returns {Object} A falsy value for unhandled events, a truthy value for handled events
   */
  handleMessage(janus_message) {
    const { plugindata, transaction } = janus_message;
    if (plugindata && plugindata.data && plugindata.data.videocall) {
      //Got message
      const message_data = plugindata.data;
      const { result } = message_data;



      ////////////////////////////////////////////events////////////////////////////////////////////////////
      console.log(" ::: Got a message :::", janus_message);
      if (result) {
        if (result["list"]) {
          let list = result["list"];
          console.log("Got a list of registered peers:", list);
  
        } else if (result["event"]) {
          let event = result["event"];

          if (event === PLUGIN_EVENT.REGISTRED) {

          } else if (event === PLUGIN_EVENT.CALLING) {
            console.log("Waiting for the peer to answer...");
  
          } else if (event === PLUGIN_EVENT.INCOMMING) {
            console.log("Incoming call from " + result["username"] + "!");

            // Notify user
      

          } else if (event === PLUGIN_EVENT.ACCEPTED) {
     
              //videocall.handleRemoteJsep({ jsep: jsep });
   
          } else if (event === PLUGIN_EVENT.UPDATE) {
            // An 'update' event may be used to provide renegotiation attempts
   
          } else if (event === PLUGIN_EVENT.HANGUP) {

           // videocall.hangup();
      
          } else if (event === PLUGIN_EVENT.SIMULCAST) {
            // Is simulcast in place?
            //let substream = result["substream"];
         
          }
        }
      } else {
        // FIXME Error?

      }
    


    //////////////////////////////////////////////end//evends////////////////////////////////////////////////////////

































    /* Prepare an object for the output Janode event */
    //@ts-ignore
    const janode_event = this._newPluginEvent(janus_message);
    console.log(janus_message)
    console.log("----------------------------videocall---events----------------------------------")

  }else if(plugindata && plugindata.data && plugindata.data.error) {

  /* Prepare an object for the output Janode event */
  //@ts-ignore
  const janode_event = this._newPluginEvent(janus_message);
  console.log(janus_message)
  console.log("----------------------------videocall----error-events----------------------------------")
}

/* The event has not been handled, return a falsy value */
return null;
  }

  /*----------*/
  /* USER API */
  /*----------*/

  /* These are the APIs that users need to work with the recordplay plugin */

  /**
   * List recordings.
   *
   * @param {Object} params
   * @param {string} [params.admin_key] - The optional admin key needed for invoking the API
   * @returns {Promise<module:recordplay-plugin~RECORDPLAY_EVENT_RECORDINGS_LIST>}
   */
  async register(user_id) {
  const body = {
    request: REQUEST_REGISTER,
    username: user_id
  };

  //@ts-ignore
  const response = await this.message(body);
  //@ts-ignore
  const { event, data: evtdata } = this._getPluginEvent(response);
  console.log("-------------------------videocall--plugin------------------------------")
  console.log(event)

  if (event === PLUGIN_EVENT.REGISTRED || PLUGIN_EVENT.ERROR)
    return evtdata;
  const error = new Error(`unexpected response to ${body.request} request`);
  throw (error);
}




  /**
   * Start a playback session.
   *
   * @param {Object} params
   * @param {RTCSessionDescription} params.jsep
   * @returns {Promise<module:streaming-plugin~RECORDPLAY_EVENT_STATUS>}
   */
  async call(user_id, sdp) {

  const body = {
    request: REQUEST_CALL,
    username: user_id
  };
//@ts-ignore
  const response = await this.message(body, sdp);
  //@ts-ignore
  const { event, data: evtdata } = this._getPluginEvent(response);;
  if (event === PLUGIN_EVENT.CALLING || PLUGIN_EVENT.ERROR)
    return evtdata;
  const error = new Error(`unexpected response to ${body.request} request`);
  throw (error);
}


async accept(sdp){
  const body = {
    request: REQUEST_ACCEPT
  };
//@ts-ignore
  const response = await this.message(body, sdp);
  //@ts-ignore
  const { event, data: evtdata } = this._getPluginEvent(response);;
  if (event === PLUGIN_EVENT.ACCEPTED)
    return evtdata;
  const error = new Error(`unexpected response to ${body.request} request`);
  throw (error);
}


}
export default {
  id: PLUGIN_ID,
  Handle: VideoCallHandle,

  EVENT: {
    /**
     * Trouble on an active stream.
     *
     * @event module:recordplay-plugin~RecordPlayHandle#event:RECORDPLAY_SLOW_LINK
     * @type {module:recordplay-plugin~RECORDPLAY_EVENT_SLOW_LINK}
     */
    VIDEOCALL_REGISTRED: PLUGIN_EVENT.REGISTRED,
    VIDEOCALL_CALLING: PLUGIN_EVENT.CALLING,
    VIDEOCALL_INCOMMING: PLUGIN_EVENT.INCOMMING,
    VIDEOCALL_ACCEPTED: PLUGIN_EVENT.ACCEPTED,
  },
};
