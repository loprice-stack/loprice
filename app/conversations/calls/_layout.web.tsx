import { Stack, useFocusEffect } from 'expo-router';
import {
  Avatar,
  Button,
  Label,
  useWindowDimensions,
  View,
  XStack,
  YStack,
} from 'tamagui'

import { CALL_STATE_CALLING, CALL_STATE_HANGUP, CALL_STATE_HANGUP_D, CALL_STATE_INCOMMING, CALL_STATE_START_CALL, CAMERA_FACING_MODE_ENVIRONMENT, CAMERA_FACING_MODE_USER, LOPRICE_JANUS_ICE_SERVER, LOPRICE_UI_CONTEXT_CALL } from 'utils/constants';
import { setCallContext, setCallErrorDialogOpen, setCallErrorMessage, setCallState, setCameraFacingMode, setRemoteSdp } from '../../../components/conversations/calls/callsSlice';
import VideoCallHandle from 'client/janus/videocall-plugin'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection';
import { _message, _session, _videohandle, useAppDispatch, useAppSelector } from 'store/redux/store';
import { initializeLopriceServices, isLoggedIn, isVideoCallHandlePluged, janussession } from 'client/janus/janus';

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
import { useCallback, useContext, useEffect, useState } from 'react';
import RegisterCallIdAlertDialogy from 'components/account/info/RegisterCallIdAlertDialogy';
import CallErrorAlertDialogy from 'components/conversations/calls/CallErrorAlertDialogy';
import { Mic, MicOff, Phone, PhoneIncoming, PhoneOff, SwitchCamera, Video, VideoOff } from '@tamagui/lucide-icons-2';





export default function Calls() {

  const sessionContext = useContext(_session)
  const videoCallContext = useContext(_videohandle)
  const messageContext = useContext(_message)
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const [callupdate, setCallUpdate] = useState(false)



  const {
    caller,
    callstate,
    ringer,
    //videocallhandle,
    //peerconnection,
    //localstream,
    //remotestream,
    localsdp,
    remotesdp,
    camera_facing_mode
  } = useAppSelector(state => state.calls)
  const { user_id, user_token, password } = useAppSelector(state => state.account.user)
  const [signalingstatechange, setSignalingstatechange] = useState("have-local-offer")
  const [localstream, setLocalstream] = useState<MediaStream>(null)
  const [remotestream, setRemotestream] = useState<MediaStream>(null)
  const [remoteCandidates, setRemoteCandidates] = useState([])
  const [islisterning, setIsListerning] = useState(false)
  const [ismicon, setIsMicOn] = useState(true)
  const [isvideoon, setIsVideoOn] = useState(true)

  useEffect(() => {

    if (callstate == CALL_STATE_INCOMMING) {
      acceptCall()
    } else if (callstate == CALL_STATE_START_CALL) {
      startCall()
    } else if (callstate == CALL_STATE_HANGUP_D) {
      hangupCall()
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      console.log('Screen is now in focus (user may have come back to it)');
    }, [])
  );


  if (callstate.toString() !== LOPRICE_UI_CONTEXT_CALL) {
    dispatch(setCallContext(LOPRICE_UI_CONTEXT_CALL))
  }


  function backNavigationListener() {

  }



  async function startCall() {
    if (isVideoCallHandlePluged(sessionContext, videoCallContext, user_id, user_token)) {
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
          eventDetached(videoCallContext.videohandle)
          eventUpdate(videoCallContext.videohandle)
          await setMediaStream(pc)
          const jsep = await createOffer(pc)
          console.log("--------setting----all-------listerner------------")
          //@ts-ignore
          videoCallContext.videohandle.call(caller, jsep)
      } catch (err) {
        console.log(err)
        console.log("Error starting a call")
      };
    }
  }


  async function setAudio(audio) {
    if (isVideoCallHandlePluged(sessionContext, videoCallContext, user_id, user_token)) {
      try {
        //@ts-ignore
        videoCallContext.videohandle.setAudio(audio)
        setIsMicOn(audio)
        console.log("--------mute---unmute--audio---calll------------")

      } catch (err) {
        console.log(err)
        console.log("Error mute  unmute a call")
      };
    }
  }


  async function setVideo(video) {
    if (isVideoCallHandlePluged(sessionContext, videoCallContext, user_id, user_token)) {
      try {
        //@ts-ignore
        videoCallContext.videohandle.setVideo(video)
        setIsVideoOn(video)
        console.log("--------mute---unmute--audio---calll------------")

      } catch (err) {
        console.log(err)
        console.log("Error mute  unmute a call")
      };
    }
  }

  

  //This was attempt on call update when you want 
  // to swiitch face camera from user to environment
  //while the call is in connected state
  async function updateCall() {
    if (isVideoCallHandlePluged(sessionContext, videoCallContext, user_id, user_token)) {
      try {

        if (((callstate == 'connected')
          || (callstate == 'accepted'))) {

          let pc = new RTCPeerConnection({ iceServers: LOPRICE_JANUS_ICE_SERVER });
          await setMediaStream(pc)
          const jsep = await createOffer(pc)
          //@ts-ignore
          videoCallContext.updatedpeerconn = pc
          //@ts-ignore
          videoCallContext.videohandle.update(jsep)
          console.log("--------starting-----a-----calll---update---------")
        }
        console.log("--------setting----update-------listerner------------")
      } catch (err) {
        console.log(err)
        console.log("Error mute  unmute a call")
      };
    }
  }







  async function acceptCall() {

    if (isVideoCallHandlePluged(sessionContext, videoCallContext, user_id, user_token)) {
      try {

        if (callstate.toString() !== LOPRICE_UI_CONTEXT_CALL) {
          dispatch(setCallContext(LOPRICE_UI_CONTEXT_CALL))
        }
        let pc = new RTCPeerConnection({ iceServers: LOPRICE_JANUS_ICE_SERVER });
        //@ts-ignore
        videoCallContext.peerconn = pc
        handleCallOnstart(pc, videoCallContext.videohandle)
        eventIcomming(videoCallContext.videohandle)
        eventAccepted(videoCallContext.videohandle)
        eventTricle(videoCallContext.videohandle)
        eventHangup(videoCallContext.videohandle)
        eventDetached(videoCallContext.videohandle)
        eventUpdate(videoCallContext.videohandle)
        await setMediaStream(pc)
        const jsep = await createOfferAnser(pc, remotesdp)
        //@ts-ignore
        videoCallContext.videohandle.accept(jsep)

      } catch (err) {
        console.log(err)
        console.log("Error answering a call")
      };
    }
  }



  //This was attempt on call update when you want 
  // to swiitch face camera from user to environment
  //while the call is in connected state
  async function acceptUpdatedCall(jsep_r) {
    if (isVideoCallHandlePluged(sessionContext, videoCallContext, user_id, user_token)) {
      try {

        if (callstate.toString() !== LOPRICE_UI_CONTEXT_CALL) {
          dispatch(setCallContext(LOPRICE_UI_CONTEXT_CALL))
        }
  
          let pc = new RTCPeerConnection({ iceServers: LOPRICE_JANUS_ICE_SERVER });
        //@ts-ignore
          videoCallContext.updatedpeerconn = pc
          console.log("--------------------updated--peerconection----created------------")
          const jsep = await createOfferAnser(videoCallContext.updatedpeerconn, jsep_r)
          console.log("--------------------updated--jsep----created------------")
          //@ts-ignore
          videoCallContext.videohandle.update(jsep)
          console.log("--------------------updated--jsep/answer----sent----back--------")
        
      } catch (err) {
        console.log(err)
        console.log("Error answering updated call")
      };
    }
  }





  async function hangupCall() {
    if (isLoggedIn(user_token)) {
      try {
        //@ts-ignore
        await videoCallContext.videohandle.hangup()
        stopAllStreams();
        closePeerConnection(videoCallContext.peerconn)
        console.log("Hangup successfully")
      } catch (err) {
        //close anyway
        stopAllStreams();
        closePeerConnection(videoCallContext.peerconn)
        dispatch(setCallState(CALL_STATE_HANGUP))
        console.log("Error closing a call")

      };
    }
  }

  async function hangupCallRemote() {
    try {
      setLocalstream(null)
      console.log(" Local stream closed ")
      setRemotestream(null)
      console.log(" Remote stream closed ")
      closePeerConnection(videoCallContext.peerconn)
      console.log("We Hanguped successfully")
      dispatch(setCallState(CALL_STATE_HANGUP))
    } catch (err) {
      //close anyway
      setLocalstream(null)
      console.log(" Local stream closed ")
      setRemotestream(null)
      console.log(" Remote stream closed ")
      closePeerConnection(videoCallContext.peerconn)
      console.log("Error hanguped a call")
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
    setRemoteCandidates([]);
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

    try {
      const mediaStream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          frameRate: 30,
          facingMode: camera_facing_mode
        }
      })
      //@ts-ignore
      setLocalstream(mediaStream)
      mediaStream.getTracks().forEach(
        track => peerConnection.addTrack(track, mediaStream)
      );
    } catch (err) {
      dispatch(setCallErrorDialogOpen(true))
      dispatch(setCallErrorMessage("Device in use"))
      console.log(err)
    }

  }


  

  async function stopAllStreams() {
    if (localstream !== null) {
      //@ts-ignore
      localstream.getTracks().forEach(track => track.stop());
      await setLocalstream(null)
      console.log(" Local stream closed ")
    }
    if (remotestream !== null) {
      //@ts-ignore
      remotestream.getTracks().forEach(track => track.stop());
      await setRemotestream(null)
      console.log(" Remote stream closed ")
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
      <Stack.Screen options={{ title: "Calls", headerShown: false }} />
      <YStack style={{ position: "absolute", display: remotestream ? 'none' : 'flex', }} items="center" gap="$6">
        <RegisterCallIdAlertDialogy />
        <CallErrorAlertDialogy />
        <Avatar circular size="$10">
          <Avatar.Image
            aria-label="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback bg="$blue10" />
        </Avatar>
        <Label style={{ alignSelf: 'center' }}>
          {caller}
        </Label>
        <Label style={{ alignSelf: 'center' }}>
          {callstate}
        </Label>
      </YStack>
      <Contents800_2_flexdirection>
        <View
          position="absolute"
          //@ts-ignore
          bottom={2}
          style={{ width: width < 600 ? width : 800, height: height }}>
          {remotestream && (
            <RTCView
              style={{ backgroundColor: 'black', width: 800, height: height }}
              mirror={true}
              objectFit={'cover'}
              stream={remotestream}
              zOrder={0}
            />
          )}
        </View>
        <View
          position="absolute"
          //@ts-ignore
          bottom={60}
          style={{ marginLeft: 8, width: 100, height: 150 }}>
          {localstream && (
            <RTCView
              style={{ backgroundColor: 'black', width: 100, height: 150 }}
              mirror={true}
              objectFit={'cover'}
              stream={localstream}
              zOrder={0}
            />
          )}
        </View>
      </Contents800_2_flexdirection>
      <View
        style={{ width: width < 600 ? width - 20 : 800, alignItems: 'center' }}
        position="absolute"
        //@ts-ignore
        bottom={5}
        zIndex={999}
      >
        <XStack gap={8}>
          <Button
            theme={((callstate == 'incoming')
              || (callstate == 'calling')
              || (callstate == 'connecting')
              || (callstate == 'connected')
              || (callstate == 'accepted')) ?
              'red_accent' : 'green_accent'}
            onPress={
              //"call" | "calling" | "incoming" | "hangup" | "iddle" | "connected" | "accepted"
              () => {
                ((callstate == 'incoming')
                  || (callstate == 'calling')
                  || (callstate == 'connecting')
                  || (callstate == 'connected')
                  || (callstate == 'accepted')) ?
                  hangupCall() : startCall()
              }
            }
          >{((callstate == 'incoming')
            || (callstate == 'calling')
            || (callstate == 'connecting')
            || (callstate == 'connected')
            || (callstate == 'accepted')) ?
            <PhoneOff /> : <Phone />
            }</Button>
          <Button
            theme={'green_accent'}
            style={{ display: callstate == "incoming" ? "flex" : "none" }}
            onPress={() => acceptCall()}
          ><PhoneIncoming /></Button>
          <Button
            theme={'white_accent'}
            style={{
              display: ((callstate == 'connected')
                || (callstate == 'accepted')) ? "flex" : "none"
            }}
            onPress={() => { ismicon ? setAudio(false) : setAudio(true) }}
          >{ismicon ? <Mic /> : <MicOff />}</Button>
          <Button
            theme={'white_accent'}
            style={{
              display: ((callstate == 'connected')
                || (callstate == 'accepted')) ? "flex" : "none"
            }}
            onPress={() => { isvideoon ? setVideo(false) : setVideo(true) }}
          >{isvideoon ? <Video /> : <VideoOff />}</Button>
        </XStack>
      </View>
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
    let remoCandidates = [];
    videohandle.on(VideoCallHandle.EVENT.VIDEOCALL_TRICKLE, evtdata => {
      if ((signalingstatechange == "have-local-offer")
        || (signalingstatechange == "stable")) {
        const completed = evtdata.complete
        if (completed) {
          //@ts-ignore
          remoCandidates.push(null);
          setRemoteCandidates(remoCandidates)
          console.log(remoteCandidates)
          console.log("------------------null--------list------------------------------------")
        } else {
          const iceCandidate = new RTCIceCandidate(evtdata);
          //@ts-ignore
          remoCandidates.push(iceCandidate);
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
      setCallUpdate(false)
      console.log("-------------------------accepted--------------------------------")
    });
  }



  function eventHangup(videohandle) {
    videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_HANGUP, evtdata => {
      const reason = evtdata.result.reason
      const username = evtdata.result.username
      console.log(reason)
      console.log(username)
      hangupCallRemote()
      setCallUpdate(false)
      console.log("-------------------------hangupCallRemote--------------------------------")
    });
  }


  function eventDetached(videohandle) {
    videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_DETACHED, evtdata => {
      const session_id = evtdata.session_id
      const handle_id = evtdata.handle_id
      videoCallContext.videohandleattached = false
      console.log(session_id)
      console.log(handle_id)
      setCallUpdate(false)
      console.log("--------videocall--handle---detached----------")
    });
  }


  //This was attempt on call update when you want 
  // to swiitch face camera from user to environment
  //while the call is in connected state
  function eventUpdate(videohandle) {
    videohandle.once(VideoCallHandle.EVENT.VIDEOCALL_UPDATE, evtdata => {
      const jsep = evtdata.jsep
      if (jsep) {
        if (jsep.type == "offer") {
          acceptUpdatedCall(jsep)
          console.log("-------------videocall--handle---update--we-received--offer-----------")
        } else if (jsep.type == "answer") {
          saveReceivedJsepAnswer(videoCallContext.updatedpeerconn, jsep).then((s) => {
            videoCallContext.peerconn == videoCallContext.updatedpeerconn
            videoCallContext.updatedpeerconn = null

          })
        }
      }
      console.log("-------------videocall--handle---update--------------")
    });
  }


  function handleCallOnstart(peerConnection, vch) {
    if (peerConnection !== null) {
      peerConnection.addEventListener('track', event => {
        setRemotestream(event.streams[0])
        console.log(event)
        console.log("----------------------track----remote-----------------------------")
      });

      peerConnection.addEventListener('connectionstatechange', event => {
        switch (peerConnection.connectionState) {
          case 'closed':
            // You can handle the call being disconnected here.
            break;
        };
        dispatch(setCallState(peerConnection.connectionState))
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















