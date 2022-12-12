export const peer = new RTCPeerConnection({
    iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478"
            ]
        }
    ]
})
export const createOffer = async () => {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    return offer
}

export const createAnswer = async (offer: any) => {
    await peer.setRemoteDescription(offer)
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    return answer
}

export const sendStream = async (stream: any) => {
    const tracks = stream.getTracks()
    for (const track of tracks) {
        peer.addTrack(track, stream)
    }
}