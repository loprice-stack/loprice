import { Stack } from 'expo-router';

import {
  Button,
  Separator,
  useWindowDimensions,
  View,
} from 'tamagui'
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
} from 'react-native-webrtc-web-shim';
import Janode from 'janode';
import VideoRoomPlugin from 'janode/src/plugins/videoroom-plugin';

import { setConnection, setSession } from '../conversationsSlice';
import { useContext, useEffect, useState } from 'react';
import Contents400_2 from 'components/Contents400_2';
import Contents400_2_flex from 'components/Contents400_2_flex';
import { LOPRICE_JANUS_ICE_SERVER } from 'client/constants';
import { setCallState, setLocalStream, setPeerConnection, setRemoteSdp, setRemoteStream, setVideoCallHandle } from './callsSlice';
import VideoCallHandle from 'client/janus/videocall-plugin'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection';
import { janodeContext, useAppDispatch, useAppSelector } from 'store/redux/store';
import { janussession } from 'client/janus/janus';


export default function Calls() {

  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { 
    callstate,
    ringer,
    videocallhandle,
    peerconnection,
    localstream,
    remotestream,
    localsdp,
    remotesdp 
  } = useAppSelector(state => state.calls)

  //const [rjsep, setRjsep] = useState({})
  //const [callstate, setCallstate] = useState('iddle')


  async function getConnection() {

    const session = await janussession()

    // Attach to a plugin using the plugin descriptor
    const videohandle = await session.attach(VideoCallHandle)
    eventCalling(videohandle)
    eventIcomming(videohandle)
    eventAccepted(videohandle)
    videohandle.handleIceCandidate();
    videohandle.handleOntrack()
    videohandle.register("loprice@loprice.co.tz")
    dispatch(setVideoCallHandle(videohandle))
    console.log("-------------------------videohandle--------------------------------")
  }



  useEffect(() => {
    getConnection()
  }, []);



  function eventCalling(videohandle) {

    videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_CALLING, evtdata => {
      console.log(JSON.stringify(evtdata))
      console.log("-------------------------calling--------------------------------")
    });
  }

  function eventIcomming(videohandle) {

    videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_INCOMMING, evtdata => {
      const jsep = evtdata.jsep
      console.log(jsep)
      console.log("-------------------------icomming----jsep----------------------------")
      dispatch(setCallState("incoming"))
      dispatch(setRemoteSdp(jsep))
      //setCallstate("incoming")
      //setRjsep(jsep)
      console.log("-------------------------icomming--------------------------------")
    });
  }


  function eventAccepted(videohandle) {

    videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_ACCEPTED, evtdata => {
      const jsep = evtdata.jsep
      console.log(jsep)
      console.log("-------------------------accepted---jsep-----------------------------")

      dispatch(setRemoteSdp(jsep))
      dispatch(setCallState("accepted"))
      //setCallstate("accepted")
      //setRjsep(jsep)
      videocallhandle.saveReceivedJsepAnswer(jsep)
      console.log("-------------------------accepted--------------------------------")
    });
  }













  async function startCall() {
    try {
      videocallhandle.setMediaStream()
      const jsep = await videocallhandle.createOffer()
      videocallhandle.call("timo@loprice.co.tz", jsep)
    } catch (err) {
      console.log("Error starting a call")
    };
  }


  async function acceptCall() {
    try {
      videocallhandle.setMediaStream()
      const jsep = await videocallhandle.createOfferAnser(remotesdp)
      videocallhandle.accept(jsep)
    } catch (err) {
      console.log("Error answering a call")
    };
  }


    async function hangupCall() {
    try {
      await videocallhandle.hangup()
      videocallhandle.clearWbrtcStuff()

    } catch (err) {
      console.log("Error answering a call")
    };
  }
















  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Calls", headerShown: true }} />
      <Contents800_2_flexdirection>
        <Contents400_2>
          <Button background={'red'} onPress={() => startCall()}>Call </Button>

          {remotestream && (
            <RTCView
              style={{ backgroundColor: 'black', width: '100%', height: '100%' }}
              mirror={true}
              objectFit={'cover'}
              streamURL={remotestream}
              zOrder={0}
            />
          )}
        </Contents400_2>
        <Separator vertical={width < 600 ? false : true} my={15} gap={'$8'} />
        <Contents400_2_flex>
          <Button onPress={() => hangupCall()}>Hangup </Button>
          <Button style={{ backgroundColor: callstate == "incoming" ? "green" : undefined }} onPress={() => acceptCall() }>Answer </Button>
          {localstream && (
            <RTCView
              style={{ backgroundColor: 'black', width: '100%', height: '100%' }}
              mirror={true}
              objectFit={'cover'}
              streamURL={localstream}
              zOrder={0}
            />
          )}
        </Contents400_2_flex>
      </Contents800_2_flexdirection>
    </View>
  )
}















