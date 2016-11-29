import zerorpc
from engine import BMEngine

bmEngine = BMEngine()

class ListenerRPC(object):

    def send(self, name):
        print("receive message: " + name)
        # bmEngine.receiveFeedback
        return "from RPC message: " + name

    def getTrack(self, message):
        print('get track called. message: ' + message)
        trackId = bmEngine.getTrack()
        return trackId

    def receiveFeedback(self, feedback, trackId):

        print('feedback: ' + feedback + ", trackId: " + trackId)
        # print('receivedFeedback. message: ' + message)
        msg = bmEngine.receiveFeedback(feedback, trackId)
        return msg

s = zerorpc.Server(ListenerRPC())
s.bind("tcp://0.0.0.0:4242")

print("python server is running")
s.run()


# class HelloRPC(object):
#     def hello(self, name):
#         print('receive message: ' + name)
#         return "Hello, %s" % name

# s = zerorpc.Server(HelloRPC())
# s.bind("tcp://0.0.0.0:4242")