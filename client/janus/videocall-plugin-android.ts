'use strict';

/**
 * This module contains the implementation of the Record&Play plugin (ref. {@link https://janus.conf.meetecho.com/docs/videocall.html}).
 * 
 * 
 * 
 * @module videocall-plugin
 */

import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';


import Handle from 'janode/src/handle.js';
import { randomString } from 'janode/src/utils/utils.js';
import { LOPRICE_JANUS_ICE_SERVER } from 'client/constants';
import { setLocalSdp, setLocalStream, setPeerConnection, setRemoteSdp, setRemoteStream } from 'app/conversations/calls/callsSlice';
import { store } from 'store/redux/store';

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
  LIST: 'videocall_list',
  REGISTRED: 'videocall_registered',
  CALLING: 'videocall_calling',
  INCOMMING: 'videocall_incomingcall',
  ACCEPTED: 'videocall_accepted',
  HANGUP: 'videocall_hangup',
  UPDATE: 'videocall_update',
  SIMULCAST: 'videocall_simulcast',
  JSEP: 'videocall_jsep',
  TRICKLE: 'videocall_trickle',
  ERROR: 'videocall_error',
  ERROR_CODE: 'videocall_error_code',
};


type RTCPeerConnectionnull = RTCPeerConnection | null
type MediaStreamnull = MediaStream | null
type RTCSessionDescriptionempty = RTCSessionDescription | {}
let peerConnection: RTCPeerConnectionnull = null



/**
 * The class implementing the VideoCall plugin (ref. {@link https://janus.conf.meetecho.com/docs/videocall.html}).<br>
 *
 * It extends the base Janode Handle class and overrides the base "handleMessage" method.<br>
 *
 * Moreover it defines many methods to support VideoCall operations.
 *
 * 
 * @hideconstructor
 * @extends module:handle~Handle
 */
class VideoCallHandle extends Handle {
  /**
   * Create a Janode VideoCall handle.
   *
   * @param {module:session~Session} session - A reference to the parent session
   * @param {number} id - The handle identifier
   *
   */
  constructor(session, id) {
    super(session, id);
    peerConnection = new RTCPeerConnection({ iceServers: LOPRICE_JANUS_ICE_SERVER });
    store.dispatch(setPeerConnection(peerConnection))
  }

  /**
    * The custom "handleMessage" needed for handling VideoCall messages.
    *
    * @private
    * @param {Object} janus_message
    * @returns {Object} A falsy value for unhandled events, a truthy value for handled events
    */
  _handleMessage(janus_message) {

    const { janus, jsep, plugindata, transaction } = janus_message;



    if (plugindata && plugindata.data && plugindata.data.videocall) {




      //Got message
      const message_data = plugindata.data;
      const { videocall, error, error_code } = message_data;

      /* Prepare an object for the output Janode event */
      //@ts-ignore
      const janode_event = this._newPluginEvent(janus_message);

      /* The plugin will emit an event only if the handle does not own the transaction */
      /* That means that a transaction has already been closed or this is an async event */
      //@ts-ignore
      const emit = (this.ownsTransaction(transaction) === false);


      const result = message_data.result.event;


      switch (result) {

        case 'list':
          janode_event.data.list = message_data.result.list;
          janode_event.event = PLUGIN_EVENT.LIST;
          console.log("---------videocall-plugin--events----list---check--------------")
          break;
        case "registered":
          janode_event.data.result = message_data.result;
          janode_event.event = PLUGIN_EVENT.REGISTRED;
          console.log("---------videocall-plugin--events----registered---check--------------")
          break;
        case 'calling':
          janode_event.data.result = message_data.result;
          janode_event.event = PLUGIN_EVENT.CALLING;
          console.log("---------videocall-plugin--events----calling---check--------------")
          break;
        case 'incomingcall':
          janode_event.data.result = message_data.result;
          janode_event.event = PLUGIN_EVENT.INCOMMING;
          console.log("---------videocall-plugin--events----incomingcall---check--------------")
          break;
        case 'accepted':
          janode_event.data.result = message_data.result;
          janode_event.event = PLUGIN_EVENT.ACCEPTED;
          console.log("---------videocall-plugin--events----accepted---check--------------")
          break;
        case 'update':
          janode_event.data.result = message_data.result;
          janode_event.event = PLUGIN_EVENT.UPDATE;
          console.log("---------videocall-plugin--events----update---check--------------")
          break;
        case 'hangup':
          janode_event.data.result = message_data.result;
          janode_event.event = PLUGIN_EVENT.HANGUP;
          console.log("---------videocall-plugin--events----hangup---check--------------")
          break;
        case 'simulcast':
          janode_event.data.result = message_data.result;
          janode_event.event = PLUGIN_EVENT.SIMULCAST;
          console.log("---------videocall-plugin--events----simulcast---check--------------")
          break;
        /* Generic events (error, notifications ...) */
        case 'event':
          /* VideoCall Error */
          if (error) {
            janode_event.event = PLUGIN_EVENT.ERROR;
            janode_event.data = new Error(`${error_code} ${error}`);
            janode_event.data._code = error_code;
            /* In case of error, close a transaction */
            //@ts-ignore
            this.closeTransactionWithError(transaction, janode_event.data);
            break;
          }

      }


      /* The event has been handled */
      if (janode_event.event) {
        /* Try to close the transaction */
        //@ts-ignore
        this.closeTransactionWithSuccess(transaction, janus_message);
        /* If the transaction was not owned, emit the event */
        //@ts-ignore
        if (emit) this.emit(janode_event.event, janode_event.data);
        console.log(janode_event);
        console.log("----------videocall---events-----janode_event-----success-----")


        return janode_event;
      }

    }


    //handle trickle
    if (janus == 'trickle') {

      /* Prepare an object for the output Janode event */
      //@ts-ignore
      const janode_event = this._newPluginEvent(janus_message);
      const { completed, sdpMid, sdpMLineIndex, candidate } = janus_message.candidate;
      /* The plugin will emit an event only if the handle does not own the transaction */
      /* That means that a transaction has already been closed or this is an async event */
      //@ts-ignore
      const emit = (this.ownsTransaction(transaction) === false);

      console.log("----------videocall---events-----janode_event-----trickleeeee----------")
      if (!completed) {
        janode_event.data.sdpMid = (typeof janus_message.candidate.sdpMid !== 'undefined')
         || (janus_message.candidate.sdpMid !== null)  ? sdpMid : '0';
        janode_event.data.sdpMLineIndex = (typeof janus_message.candidate.sdpMLineIndex !== 'undefined')
         || (janus_message.candidate.sdpMLineIndex !== null) ? sdpMLineIndex : 0;
        janode_event.data.candidate = candidate;
      }
      else {
           janode_event.data.complete = true;
      }

      janode_event.event = PLUGIN_EVENT.TRICKLE;

      /* The event has been handled */
      if (janode_event.event) {
        /* Try to close the transaction */
        //@ts-ignore
        this.closeTransactionWithSuccess(transaction, janus_message);
        /* If the transaction was not owned, emit the event */
        //@ts-ignore
        if (emit) this.emit(janode_event.event, janode_event.data);
        console.log(janode_event);
        console.log("----------videocall---events-----janode_event--trickleeeeeee---success-----")
        return janode_event;
      }
    }


    /* The event has not been handled, return a falsy value */
    return null;
  }


  /*----------*/
  /* USER API */
  /*----------*/

  /* These are the APIs that users need to work with the videocall plugin */


  /**
   * Register user.
   *
   * @param {Object} params
   * @param {string} [params.user_id] 
   * @returns {Promise<module:videocall-plugin~PLUGIN_EVENT.REGISTRED>}
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

    if (event === PLUGIN_EVENT.REGISTRED || PLUGIN_EVENT.ERROR)
      return evtdata;
    const error = new Error(`unexpected response to ${body.request} request`);
    throw (error);
  }


  /**
   * Start a call.
   *
   * @param {Object} params
   * @param {string} [params.user_id] 
   * @param {RTCSessionDescription} params.jsep
   * @returns {Promise<module:streaming-plugin~RECORDPLAY_EVENT_STATUS>}
   */
  async call(user_id, jsep) {

    const body = {
      request: REQUEST_CALL,
      username: user_id
    };

    //@ts-ignore
    const response = await this.message(body, jsep);
    //@ts-ignore
    const { event, data: evtdata } = this._getPluginEvent(response);;
    if (event === PLUGIN_EVENT.CALLING || PLUGIN_EVENT.ERROR)
      return evtdata;
    const error = new Error(`unexpected response to ${body.request} request`);
    throw (error);
  }



  async tricklee(candidate) {


    //@ts-ignore
    const response = await this.trickle(candidate);
    //@ts-ignore
    const { event, data: evtdata } = this._getPluginEvent(response);;
    if (event === PLUGIN_EVENT.TRICKLE || PLUGIN_EVENT.ERROR)
      return evtdata;
    const error = new Error(`unexpected response to ${candidate} request`);
    throw (error);
  }




  
    async trickleeComplete() {

    //@ts-ignore
    const response = await this.trickleComplete()
    //@ts-ignore
    const { event, data: evtdata } = this._getPluginEvent(response);;
    if (event === PLUGIN_EVENT.TRICKLE || PLUGIN_EVENT.ERROR)
      return evtdata;
    const error = new Error(`unexpected response to ${null} request`);
    throw (error);
  }





  async accept(_jsep) {
    const body = {
      request: REQUEST_ACCEPT
    };
    //@ts-ignore
    const response = await this.message(body, _jsep);
    //@ts-ignore
    const { event, data: evtdata } = this._getPluginEvent(response);;
    if (event === PLUGIN_EVENT.ACCEPTED)
      return evtdata;
    const error = new Error(`unexpected response to ${body.request} request`);
    throw (error);
  }





  async hangup() {

    const body = {
      request: REQUEST_HANGUP
    };
    //@ts-ignore
    const response = await this.message(body);
    //@ts-ignore
    const { event, data: evtdata } = this._getPluginEvent(response);;
    if (event === PLUGIN_EVENT.HANGUP)
      return evtdata;
    const error = new Error(`unexpected response to ${body.request} request`);
    throw (error);
  }

}




export default {
  id: PLUGIN_ID,
  Handle: VideoCallHandle,

  EVENT: {
    VIDEOCALL_LIST: PLUGIN_EVENT.LIST,
    VIDEOCALL_REGISTRED: PLUGIN_EVENT.REGISTRED,
    VIDEOCALL_CALLING: PLUGIN_EVENT.CALLING,
    VIDEOCALL_INCOMMING: PLUGIN_EVENT.INCOMMING,
    VIDEOCALL_TRICKLE: PLUGIN_EVENT.TRICKLE,
    VIDEOCALL_ACCEPTED: PLUGIN_EVENT.ACCEPTED,
    VIDEOCALL_HANGUP: PLUGIN_EVENT.HANGUP,
    VIDEOCALL_UPDATE: PLUGIN_EVENT.UPDATE,
    VIDEOCALL_SIMULCAST: PLUGIN_EVENT.SIMULCAST,
    VIDEOCALL_ERROR: PLUGIN_EVENT.ERROR,
  },
};
