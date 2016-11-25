import sys, json


def process(feedback, trackId):

    #keunwoo

    if feedback == "like":
        #like trackId;
        message = "succeed like"
    elif feedback == "dislike":
        #dislike
        message = "succeed dislike"
    else:
        message = "feedback string error. should use 'like' or 'dislike'"
    
    return message






args = []
for line in sys.stdin:
    args.append(line[:-1])

feedback = args[0]
trackId = args[1]

message = process(feedback, trackId)
print(message)