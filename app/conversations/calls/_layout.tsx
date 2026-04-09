import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection';
import { Stack } from 'expo-router';
import { useAppDispatch, useAppSelector } from 'store/redux/store';
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
import { setSession } from '../conversationsSlice';
import { useContext, useState } from 'react';
import Contents400_2 from 'components/Contents400_2';
import ContactsTypeCard from 'components/conversations/contacts/ContactsTypeCard';
import Contents400_2_flex from 'components/Contents400_2_flex';
import { setLocalStream, setPeerConnection } from './callsSlice';
import { LOPRICE_JANUS_ICE_SERVER } from 'client/constants';




export default function Calls() {

  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
const { callstate, ringer, peerconnection, localstream, remotestream, localsdp, remotesdp } = useAppSelector(state => state.calls)




  async function startCall() {
    try {
      mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then(async (media) => {

        let pc = new RTCPeerConnection({ iceServers: LOPRICE_JANUS_ICE_SERVER })
        setPeerConnListerner(pc)
        media.getTracks().forEach(
          track => pc.addTrack(track, media)
        );

        const offerDescription = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
          voiceActivityDetection: true
        });
        await pc.setLocalDescription(offerDescription);
        sendLocalSdpToRemoteUser(offerDescription);


        dispatch(setLocalStream(media))
        dispatch(setPeerConnection(pc))
        console.log(peerconnection)
      })


    } catch (err) {
      console.log("Error starting a call")
    };
  }




  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Calls", headerShown: true }} />
      <Contents800_2_flexdirection>
        <Contents400_2>
          <Button background={'red'} onPress={() => startCall()}>Call </Button>
          {localstream && (
            <RTCView
              style={{ backgroundColor: 'black', width: '100%', height: '100%' }}
              mirror={true}
              objectFit={'cover'}
              //@ts-ignore
              streamURL={localstream.toURL()}
              zOrder={0}
            />
          )}
        </Contents400_2>
        <Separator vertical={width < 600 ? false : true} my={15} gap={'$8'} />
        <Contents400_2_flex>
  
          {localstream && (
            <RTCView
              style={{ backgroundColor: 'black', width: '100%', height: '100%' }}
              mirror={true}
              objectFit={'cover'}
              //@ts-ignore
              streamURL={localstream.toURL()}
              zOrder={0}
            />
          )}
        </Contents400_2_flex>
      </Contents800_2_flexdirection>
    </View>
  )
}





function setPeerConnListerner(peerconn) {
  if (peerconn) {
    ontrack(peerconn)
    onicecandidate(peerconn)
    onicecandidateerror(peerconn)
    onicecandidatestatechange(peerconn)
    oniceconnectionstatechange(peerconn)
    onsiginalstatechange(peerconn)
    onnegotiation(peerconn)
  }

}


function ontrack(pc) {
  //@ts-ignore
  pc.addEventListener('track', event => {

    console.log(event)
    console.log("----------------------track---------------------------------")

  });
}
function onnegotiation(pc) {
  //@ts-ignore
  pc.addEventListener('connectionstatechange', event => {
    console.log(event)
    console.log("-----------------------connectionstatechange--------------------------------")
  });
}
function onicecandidate(pc) {
  //@ts-ignore
  pc.addEventListener('icecandidate', event => {
    console.log(event)
    console.log("-----------------------icecandidate--------------------------------")
  });
}

function onicecandidateerror(pc) {
  //@ts-ignore
  pc.addEventListener('icecandidateerror', event => {
    console.log(event)
    console.log("-------------------------icecandidateerror------------------------------")
  });
}
function onicecandidatestatechange(pc) {
  //@ts-ignore
  pc.addEventListener('icegatheringstatechange', event => {
    console.log(event)
    console.log("-------------------------icegatheringstatechange------------------------------")
  });
}

function oniceconnectionstatechange(pc) {
  //@ts-ignore
  pc.addEventListener('iceconnectionstatechange', event => {
    console.log(event)
    console.log("------------------------iceconnectionstatechange-------------------------------")
  });
}

function onsiginalstatechange(pc) {

  //@ts-ignore
  pc.addEventListener('negotiationneeded', event => {
    console.log(event)
    console.log("--------------------------negotiationneeded-----------------------------")
  });

}



function sendLocalSdpToRemoteUser(offerDescription: any) {
  console.log('Function not implemented.');
}
