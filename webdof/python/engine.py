import sys, json, time

class BMEngine:

    def __init__(self):
        print("Engine initialized")

    # TODO: keunwoo
    def getTrack(self):
        trackId = '0uTVChzibEWKrXojPaJ9y1'
        return trackId

    def neutralTrack(self, trackId):
        print('neutral track: ' + trackId)
        return 'processed neutral : ' + trackId
    
    # TODO: keunwoo
    def likeTrack(self, trackId):
        print('like track: ' + trackId)
        return 'processed like : ' + trackId
    
    # TODO: keunwoo
    def disLikeTrack(self, trackId):
        print('dislike track: ' + trackId)
        return 'processed dislike : ' + trackId




    def receiveFeedback(self, feedback, trackId):
        
        if feedback == "like":
        #like trackId;
            message = "succeed like"
            self.likeTrack(trackId)

        elif feedback == "dislike":
        #dislike
            message = "succeed dislike"
            self.disLikeTrack(trackId)
        
        elif feedback == "neutral":
            message = "succeed neutral"
            self.neutralTrack(trackId)

        else:
            message = "feedback string error. should use 'like' or 'dislike'"

        return message

''''
def getTrack():
    
    trackId = "0uTVChzibEWKrXojPaJ9y1"
    
    return trackId

def receiveFeedback(feedback, trackId):

    message = "feedback"

    if feedback == "like":
        #like trackId;
        message = "succeed like"
    elif feedback == "dislike":
        #dislike
        message = "succeed dislike"
    else:
        message = "feedback string error. should use 'like' or 'dislike'"
    
    return message 



##########
def main(args):
    # print('')
    global isInit

    if isInit == False:
        print('do init')
        init()
        isInit = False
    else:
        print('already init')

    argAll = ''
    for arg in args:
        argAll = argAll + ' ' + arg

    message = 'Invalid argument: ' + argAll
    
    if args[0] == 'gettrack':
        message = getTrack()
    elif args[0] == 'feedback':
        message = receiveFeedback(args[1], args[2])
    
    print(message)
    
########################


###############
args = []
for line in sys.stdin:
    args.append(line[:-1])

print('0uTVChzibEWKrXojPaJ9y1')
sys.stdout.flush()
time.sleep(2)



main(args)
#################


'''