import { Stack } from 'expo-router';

import {
  Button,
  Separator,
  useWindowDimensions,
  View,
} from 'tamagui'

import Janode from 'janode';
import VideoRoomPlugin from 'janode/src/plugins/videoroom-plugin';

import { setConnection, setSession } from '../../../components/conversations/conversationsSlice';
import { useContext, useEffect, useState } from 'react';
import Contents400_2 from 'components/Contents400_2';
import Contents400_2_flex from 'components/Contents400_2_flex';
import { CALL_STATE_CALLING, CALL_STATE_IDDLE, CALL_STATE_INCOMMING, LOPRICE_JANUS_ICE_SERVER } from 'client/constants';
import { setCallState, setLocalStream, setPeerConnection, setRemoteSdp, setRemoteStream, setVideoCallHandle } from '../../../components/conversations/calls/callsSlice';
import VideoCallHandle from 'client/janus/videocall-plugin'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection';
import { _videohandle, useAppDispatch, useAppSelector } from 'store/redux/store';
import { janussession } from 'client/janus/janus';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCRtpTransceiver,
  RTCRtpReceiver,
  RTCRtpSender,
  RTCErrorEvent,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  permissions,
  registerGlobals,
  RTCView,
} from 'react-native-webrtc-web-shim';





export default function Calls() {

  let remoteCandidates = [];
  const videoCallContext = useContext(_videohandle)
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const {
    callstate,
    ringer,
    //videocallhandle,
    //peerconnection,
    //localstream,
    //remotestream,
    localsdp,
    remotesdp
  } = useAppSelector(state => state.calls)

  const [signalingstatechange, setSignalingstatechange] = useState("have-local-offer")
  //const [remotesdp, setRjsep] = useState(null)
  //const [callstate, setCallstate] = useState(CALL_STATE_IDDLE)
  //const [peerconnection, setPeerConnection] = useState<RTCPeerConnection>(null)
  const [localstream, setLocalstream] = useState(null)
  const [remotestream, setRemotestream] = useState(null)






  async function startCall() {
    try {
      let pc = new RTCPeerConnection({ iceServers: LOPRICE_JANUS_ICE_SERVER });
      //@ts-ignore
      videoCallContext.peerconn = pc
      handleCallOnstart(pc, videoCallContext.videohandle)
      eventIcomming(videoCallContext.videohandle)
      eventCalling(videoCallContext.videohandle)
      eventAccepted(videoCallContext.videohandle)
      eventTricle(videoCallContext.videohandle)
      eventHangup(videoCallContext.videohandle)
      await setMediaStream(pc)
      const jsep = await createOffer(pc)
      //@ts-ignore
      videoCallContext.videohandle.call("test@loprice.co.tz", jsep)

    } catch (err) {
      console.log("Error starting a call")
    };
  }


  async function acceptCall() {
    try {
      let pc = new RTCPeerConnection({ iceServers: LOPRICE_JANUS_ICE_SERVER });
      //@ts-ignore
      videoCallContext.peerconn = pc
      handleCallOnstart(pc, videoCallContext.videohandle)
      eventAccepted(videoCallContext.videohandle)
      eventTricle(videoCallContext.videohandle)
      eventHangup(videoCallContext.videohandle)
      await setMediaStream(videoCallContext.peerconn)
      const jsep = await createOfferAnser(videoCallContext.peerconn, remotesdp)
      //@ts-ignore
      videoCallContext.videohandle.accept(jsep)

    } catch (err) {
      console.log(err)
      console.log("Error answering a call")
    };
  }





  async function hangupCall() {
    try {
      //@ts-ignore
      await videoCallContext.videohandle.hangup()
      stopAllStreams();
      closePeerConnection(videoCallContext.peerconn) 
    } catch (err) {
        //close anyway
      stopAllStreams();
      closePeerConnection(videoCallContext.peerconn)
      console.log("Error closing a call")
    };
  }



  function processCandidates(peerConnection, remoteCandidates) {
    if (remoteCandidates.length < 1) { return; };
    remoteCandidates.map(candidate => {
      peerConnection.addIceCandidate(candidate);
      console.log(candidate)
      console.log("---------------------saving--saved--remote---candidate-------------------------")
    });
    console.log(remoteCandidates)
    console.log("---------------------clearing--remote---candidate----list---------------------")
    remoteCandidates = [];
  };


  

  async function createOffer(peerConnection) {
    try {
      const offerDescription = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
        voiceActivityDetection: true
      });
      await peerConnection.setLocalDescription(offerDescription);
      console.log(" Got offer jsep ")
      return offerDescription
    } catch (err) {
      console.log("Error creating offer" + err)
    };
  }

  async function createOfferAnser(peerConnection, r_jsep) {
    try {
      if (r_jsep.lenght !== 0) {
        const offerDescription = new RTCSessionDescription(r_jsep);
        await peerConnection.setRemoteDescription(offerDescription);
        const answerDescription = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answerDescription);
        console.log(" Got answer jsep ")
        return answerDescription
      } else {
        console.log("No offer jsep is found")
      }
    } catch (err) {
      console.log(err)
    };
  }


  async function saveReceivedJsepAnswer(peerConnection, r_jsep) {

    try {
    // Use the received receivedAnswerDescription
    const receivedAnswerDescription = new RTCSessionDescription(r_jsep);
    console.log("Answer description object is ok")
    console.log(peerConnection.signalingState)
    console.log("-----------------signalingstatechange---------------")
    await peerConnection.setRemoteDescription(receivedAnswerDescription);
    console.log(" Saved answer jsep ")
    } catch (err) {
      console.log("---------------------------------answer---jse----error-----------------------")
    };

  }


  async function setMediaStream(peerConnection) {
    const mediaStream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        frameRate: 30,
        facingMode: 'user'
      }
    })
    //@ts-ignore
    setLocalstream(mediaStream)
    mediaStream.getTracks().forEach(
      track => peerConnection.addTrack(track, mediaStream)
    );
  }


function stopAllStreams() {
  if (localstream) {
    //@ts-ignore
    localstream.getTracks().forEach(track => track.stop());
    setLocalstream(null)
  }
  if (remotestream) {
    //@ts-ignore
    remotestream.getTracks().forEach(track => track.stop());
    setRemotestream(null)
  }
}

function closePeerConnection(pc = videoCallContext.peerconn) {
  if (!pc) return;
  //@ts-ignore
  pc.getSenders().forEach(sender => {
    if (sender.track)
      sender.track.stop();
  });
  //@ts-ignore
  pc.getReceivers().forEach(receiver => {
    if (receiver.track)
      receiver.track.stop();
  });
  //@ts-ignore
  pc.onnegotiationneeded = null;
  //@ts-ignore
  pc.onicecandidate = null;
  //@ts-ignore
  pc.oniceconnectionstatechange = null;
  //@ts-ignore
  pc.ontrack = null;
  //@ts-ignore
  pc.close();
}






  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Calls", headerShown: true }} />
      <Contents800_2_flexdirection>
        <Contents400_2>
          <Button background={'red'} onPress={() => startCall()}>Call</Button>

          {remotestream && (
            <RTCView
              style={{ backgroundColor: 'black', width: '100%', height: '100%' }}
              mirror={true}
              objectFit={'cover'}
              //@ts-ignore
              streamURL={remotestream}
              zOrder={0}
            />
          )}
        </Contents400_2>
        <Separator vertical={width < 600 ? false : true} my={15} gap={'$8'} />
        <Contents400_2_flex>
          <Button onPress={() => hangupCall()}>Hangup </Button>
          <Button style={{ backgroundColor: callstate == "incoming" ? "green" : "white" }} onPress={() => acceptCall()}>Answer</Button>
          {localstream && (
            <RTCView
              style={{ backgroundColor: 'black', width: '100%', height: '100%' }}
              mirror={true}
              objectFit={'cover'}
              //@ts-ignore
              streamURL={localstream}

              zOrder={0}
            />
          )}
        </Contents400_2_flex>
      </Contents800_2_flexdirection>
    </View>
  )

  function eventCalling(videohandle) {
    videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_CALLING, evtdata => {
      dispatch(setCallState(CALL_STATE_CALLING))
      console.log("-------------------------calling--------------------------------")
    });
  }

    function eventIcomming(videohandle) {
      videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_INCOMMING, evtdata => {
        const jsep = evtdata.jsep
        dispatch(setCallState(CALL_STATE_INCOMMING))
        dispatch(setRemoteSdp(jsep))
        console.log("-------------------------icomming--call------------------------------")
      });
    }



  function eventTricle(videohandle) {

    videohandle.on(VideoCallHandle.EVENT.VIDEOCALL_TRICKLE, evtdata => {
      if ((signalingstatechange == "have-local-offer")
        || (signalingstatechange == "stable")) {

        const completed = evtdata.complete
        if (completed) {
          //@ts-ignore
          remoteCandidates.push(null);
          console.log(remoteCandidates)
          console.log("------------------null--------list------------------------------------")
        } else {

          const iceCandidate = new RTCIceCandidate(evtdata);
          //@ts-ignore
          remoteCandidates.push(iceCandidate);
          console.log(remoteCandidates)
          console.log("--------------------------list------------------------------------")

        }
      } 
    });
  }



  function eventAccepted(videohandle) {

    videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_ACCEPTED, evtdata => {
      const jsep = evtdata.jsep
      dispatch(setRemoteSdp(jsep))
      saveReceivedJsepAnswer(videoCallContext.peerconn, jsep)
      console.log("-------------------------accepted--------------------------------")
    });
  }


  function eventHangup(videohandle) {

    videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_HANGUP, evtdata => {
      const reason = evtdata.data.result.reason
      console.log(reason)
      console.log("-------------------------hungup--------------------------------")
    });
  }






  function handleCallOnstart(peerConnection, vch) {
    if (peerConnection !== null) {

      peerConnection.addEventListener('track', event => {
        setRemotestream(event.streams[0])
        console.log(event)
        console.log("----------------------track---------------------------------")

      });

      peerConnection.addEventListener('connectionstatechange', event => {
        switch (peerConnection.connectionState) {
          case 'closed':
            // You can handle the call being disconnected here.
            break;
        };
        console.log(peerConnection.connectionState)
        console.log("-----------------connectionstatechange---------------")
      });

      peerConnection.addEventListener('icecandidate', event => {
        // When you find a null candidate then there are no more candidates.
        // Gathering of candidates has finished.
        try {
          const candidate = {
            "candidate": event.candidate.candidate,
            "sdpMLineIndex": event.candidate.sdpMLineIndex,
            "sdpMid": event.candidate.sdpMid
          }

          vch.tricklee(candidate)
          console.log(candidate)
          // Send the event.candidate onto the person you're calling.
          // Keeping to Trickle ICE Standards, you should send the candidates immediately.
        } catch (null_candidate) {
          vch.trickleeComplete()
          console.log(null_candidate)
          console.log(event)
        }


        console.log("----------------------icecandidate----stufF---------------")
      });

      peerConnection.addEventListener('icecandidateerror', event => {
        // You can ignore some candidate errors.
        // Connections can still be made even when errors occur.
         console.log(event)
        console.log("----------------------icecandidateerror----stufF---------------")
      });

      peerConnection.addEventListener('iceconnectionstatechange', event => {
        if (peerConnection.iceConnectionState === 'failed'
          || peerConnection.iceConnectionState === 'disconnected'
          || peerConnection.iceConnectionState === 'closed') {
          closePeerConnection(peerConnection);
        } else if (peerConnection.iceConnectionState === 'connected') {

        } else if (peerConnection.iceConnectionState === 'completed') {

        }
        console.log(peerConnection.iceConnectionState)
        console.log("-----------------iceconnectionstatechange---------------")
      });

      peerConnection.addEventListener('negotiationneeded', event => {
        // You can start the offer stages here.
        // Be careful as this event can be called multiple times.
        console.log("----------negotiationneeded---------------")

      });

      peerConnection.addEventListener('signalingstatechange', event => {
        switch (peerConnection.signalingState) {
          case 'closed':
            // You can handle the call being disconnected here.
            
            break;
          case 'stable':
            // You can handle the call being disconnected here.
            processCandidates(peerConnection, remoteCandidates)
            break;
        };
        setSignalingstatechange(peerConnection.signalingState)
        console.log(peerConnection.signalingState)
        console.log("-----------------signalingstatechange---------------")
      });


    } else {

      console.log("----------null---------peerconnection---------------")
    }
  }

}















